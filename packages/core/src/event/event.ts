import { Meta2d } from '../core';
import { IValue, Pen } from '../pen';
import { Network } from '../store';

export type EventValue = string | IValue | undefined | null;
// 事件行为
export type EventName =
  | 'enter'
  | 'leave'
  | 'active'
  | 'inactive'
  | 'click'
  | 'mousedown'
  | 'mouseup'
  | 'dblclick'
  | 'valueUpdate';
export interface Event {
  name: EventName;
  action: EventAction; // 事件动作
  where?: Where; // 若无条件，必须为 undefined or null，不可为空对象
  value?: EventValue; // 不同 action 下，该值含义不同，例如：动画相关的，即为 节点 tag; Function 类型即为 字符串函数
  params?: string;
  extend?: string;
  fn?: (
    pen: Pen,
    params: string,
    context?: { meta2d: Meta2d; eventName: string }
  ) => void;
  targetType?: string;
  network?: Network;
  actions?: Event[];
}

export enum EventAction {
  Link,
  SetProps,
  StartAnimate,
  PauseAnimate,
  StopAnimate,
  JS, //Function
  GlobalFn,
  Emit,
  StartVideo,
  PauseVideo,
  StopVideo,
  SendPropData,
  SendVarData,
  Navigator,
  Dialog,
  SendData, //数据源选择
}

export interface Where {
  type?: string | 'comparison';
  key?: string;
  comparison?: Comparison;
  value?: unknown;
  fn?: (
    pen: Pen,
    context?: {
      meta2d: Meta2d;
    }
  ) => boolean;
  fnJs?: string;
}

/**
 * 触发器中的符号
 */
export type Comparison =
  | '='
  | '=='
  | '!='
  | '>'
  | '<'
  | '>='
  | '<='
  | '[)' // 介于，数学中的开闭区间
  | '![)' // 非介于，与上一个相反
  /**
   * 属于，类似于 数组的 includes
   * .. 属于范围语法，30..50 等价于 介于的 [30, 50]
   * [1, 2, 3]  2 // true  1.5 // false
   * [1,20,30..50,65] 1 // true 20 // true 30 // true 30.1 // true
   */
  | '[]'
  | '![]'; // 非属于，与上一个相反

export interface TriggerCondition {
  type?: string; //'fn'|''
  operator?: Comparison;
  valueType?: string; //'prop'|''
  value?: string;
  target?: string;
  label?: string;
  fnJs?: string;
  fn?: (
    pen: Pen,
    context?: {
      meta2d: Meta2d;
    }
  ) => boolean;
}

export interface Trigger {
  name?: string;
  conditionType?: string; //'and'/'or'
  conditions?: TriggerCondition[];
  actions?: Event[];
}

export interface Bind {
  case?: string;
  id?: string;
  label?: string;
}

export interface RealTime {
  label?: string;
  key?: string;
  type?: string;
  keywords?: true;
  triggers?: Trigger[];
  binds?: Bind;
  value?: string;
}
