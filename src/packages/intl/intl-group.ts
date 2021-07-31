/**
 * File: intl-group.spec.ts
 * Description: 语言调度类，负责语言的管理
 * Created: 2021-07-27 21:58:52
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */
import { IntlMessageFormat } from 'intl-messageformat';
import { IntlSources, MessageMap } from '@/packages/intl/types';
import { INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE } from '@/packages/intl/common';


interface IntlExecutorOptions {
  intlSources: IntlSources;
}

export class IntlGroup {
  // 文案源缓存(加载后的)
  cachedIntlMessageMaps: Record<string, MessageMap> = {};

  // 文案源，其 key 为 local string (例如 zh-cn)，value 为一个文案 map，或者一个返回文案 map 的函数（懒加载）
  intlSources: IntlSources = {};


  // 文案格式化器缓存，key 为对应的文案 key
  currentCachedFormatters: Record<string, IntlMessageFormat> = {};

  // 当前文案 map，key 为文案 key, value 为相应的文案模板，这个 value 可以交给 formatter 进行处理
  currentMessageMap: MessageMap = {};

  // 当前 local string
  currentLocal: string = '';

  constructor(options: IntlExecutorOptions) {
    const { intlSources } = options;
    this.intlSources = intlSources;
  }


  /**
   * 获取文案内容
   *
   * @date 2021-07-27 23:04:01
   * @param key 文案 key
   * @param params 文案参数
   */
  public getMessage(key: string, params?: any) {
    if (!this.currentLocal) {
      throw new Error('please set current local string by calling updateCurrentLocal()!');
    }

    let targetFormatter = this.currentCachedFormatters[key];

    // 没有命中缓存
    if (!targetFormatter) {
      const messageTemplate = this.currentMessageMap[key];
      if (!messageTemplate) {
        return INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE;
      }
      targetFormatter = new IntlMessageFormat(messageTemplate, this.currentLocal);
      this.currentCachedFormatters[key] = targetFormatter;

    }

    return targetFormatter.format(params) as string;
  }

  /**
   * 更新当前语言
   *
   * @author yuzhanglong
   * @date 2021-07-28 23:30:08
   * @param newLocal 新的语言
   * @param loadWhenNotFound 如果这个参数置为 true，在匹配不到新语言的文案 map，我们会尝试从注册过的 source 中加载之
   */
  public async updateCurrentLocal(newLocal: string, loadWhenNotFound: boolean = false) {
    if (this.currentLocal === newLocal) {
      return;
    }

    let newLocalMap = this.cachedIntlMessageMaps[newLocal];

    if (!newLocalMap) {
      if (loadWhenNotFound) {
        await this.loadIntlSource(newLocal);
        newLocalMap = this.cachedIntlMessageMaps[newLocal];
      } else {
        throw new Error(`local string '${newLocal}' was not loaded, did you forget to local intl source file?`);
      }
    }
    // init
    this.currentMessageMap = newLocalMap;
    this.currentCachedFormatters = {};
    this.currentLocal = newLocal;
  }

  /**
   * 根据传入的 local string，从源数据中加载文案源
   *
   * @date 2021-07-27 23:04:01
   * @param locals 文案所在的 local
   */
  public async loadIntlSource(locals: string | string[]) {
    const resLocals = Array.isArray(locals) ? locals : [locals];

    for (let i = 0; i < resLocals.length; i += 1) {
      const local = resLocals[i];
      if (!this.cachedIntlMessageMaps[local]) {
        const targetSource = this.intlSources[local];
        if (!targetSource) {
          throw new Error(`the local '${local}' does not have any intl source!'`);
        }

        // eslint-disable-next-line no-await-in-loop
        this.cachedIntlMessageMaps[local] = typeof targetSource === 'function' ? await targetSource() : targetSource;
      }
    }
  }

  /**
   * 更新国际化源, 这个方法只执行更新操作，考虑到性能，具体的加载需要在合适的时候调用 loadIntlSource 执行
   *
   * @author yuzhanglong
   * @date 2021-07-29 16:56:04
   * @param sources 国际化源
   * @param override 是否覆盖旧的国际化源，这个值默认为 false
   */
  public updateIntlSources(sources: IntlSources, override: boolean = false) {
    if (override) {
      this.intlSources = sources;
    } else {
      this.intlSources = {
        ...this.intlSources,
        ...sources,
      };
    }
  }
}
