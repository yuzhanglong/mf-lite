/**
 * File: intl-executor.ts
 * Description: 语言调度类，负责语言的管理
 * Created: 2021-07-27 21:58:52
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */
import {IntlMessageFormat} from "intl-messageformat";

export type MessageMap = Record<string, string>

export type IntlSources = Record<string, (() => MessageMap) | (() => Promise<MessageMap>)>


interface IntlExecutorOptions {
  intlSources: IntlSources
}

export class IntlExecutor {
  // 文案源缓存(加载后的)
  cachedIntlMessageMaps: Record<string, MessageMap> = {}

  // 文案源，其 key 为 local string (例如 zh-cn)，value 为一个文案 map，或者一个返回文案 map 的函数（懒加载）
  readonly intlSources: IntlSources = {}


  // 文案格式化器缓存，key 为对应的文案 key
  currentCachedFormatters: Record<string, IntlMessageFormat> = {}

  // 当前文案 map，key 为文案 key, value 为相应的文案模板，这个 value 可以交给 formatter 进行处理
  currentMessageMap: MessageMap = {}

  // 当前 local string
  currentLocal: string = ''

  constructor(options: IntlExecutorOptions) {
    const {intlSources} = options
    this.intlSources = intlSources
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
      throw new Error('please set current local string!')
    }

    let targetFormatter = this.currentCachedFormatters[key];

    // 没有命中缓存
    if (!targetFormatter) {
      const messageTemplate = this.currentMessageMap[key]
      if (!messageTemplate) {
        return 'the message is empty...'
      } else {
        targetFormatter = new IntlMessageFormat(messageTemplate, this.currentLocal)
      }
    }

    return targetFormatter.format(params) as string
  }

  /**
   * 更新当前语言
   *
   * @author yuzhanglong
   * @date 2021-07-28 23:30:08
   * @param newLocal 新的语言
   */
  public updateCurrentLocal(newLocal: string) {
    this.currentCachedFormatters = {}

    if (this.currentLocal === newLocal) {
      return
    }

    const newLocalMap = this.cachedIntlMessageMaps[newLocal]

    if (newLocalMap) {
      // init
      this.currentCachedFormatters = {}
      this.currentMessageMap = {}
      this.currentMessageMap = newLocalMap
    } else {
      throw new Error(`local string '${newLocal}' was not loaded, did you forget to local intl source file?`)
    }

    this.currentLocal = newLocal
  }

  /**
   * 根据传入的 local string，从源数据中加载文案源
   *
   * @date 2021-07-27 23:04:01
   * @param locals 文案所在的 local
   */
  public async loadIntlSource(locals: string[]) {
    for (let local of locals) {
      if (this.cachedIntlMessageMaps[local]) {
        continue
      }

      const targetSource = this.intlSources[local];
      if (!targetSource) {
        return
      }

      try {
        this.cachedIntlMessageMaps[local] = typeof targetSource === "function" ? await targetSource() : targetSource
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
