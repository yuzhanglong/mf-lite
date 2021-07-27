/**
 * File: intl-executor.ts
 * Description: 语言调度类，负责语言的管理
 * Created: 2021-07-27 21:58:52
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */
import {IntlMessageFormat} from "intl-messageformat";

type MessageMap = Record<string, string>

type IntlSource = Record<string, (() => MessageMap) | (() => Promise<MessageMap>)>

class IntlExecutor {
  // 文案格式化器缓存，key 为对应的文案 key
  private cachedFormatters: Record<string, IntlMessageFormat> = {}

  // 当前文案 map，key 为文案 key, value 为相应的文案模板，这个 value 可以交给 formatter 进行处理
  private currentMessageMap: MessageMap = {}

  // 当前 local 字符串
  private currentLocal: string = 'zh-cn'

  // 文案源，其 key 为文案的名称(例如 zh-cn)，value 为一个文案 map，或者一个返回文案 map 的函数（懒加载）
  private intlSource: IntlSource

  // 文案源缓存(加载后的)
  private cachedIntlSource: Record<string, MessageMap>

  /**
   * 获取文案内容
   *
   * @date 2021-07-27 23:04:01
   * @param key 文案 key
   * @param params 文案参数
   */
  getMessage(key: string, params?: any) {
    let targetFormatter = this.cachedFormatters[key];

    // 没有命中缓存
    if (!targetFormatter) {
      const messageTemplate = this.currentMessageMap[key]
      if (!messageTemplate) {
        return 'the message is empty...'
      } else {
        targetFormatter = new IntlMessageFormat(messageTemplate, this.currentLocal)
      }
    }

    return targetFormatter.format(params)
  }

  /**
   * 加载文案源
   *
   * @date 2021-07-27 23:04:01
   * @param locals 文案所在的 local
   */
  async loadIntlSource(locals: string[]) {
    this.cachedFormatters = {}

  }
}
