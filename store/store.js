export class Store {
  constructor(store = {}) {
    const _this = this;
    this.observers = {}; // 订阅响应事件
    const defualtStore = {
      state: {},
      mutations: {},
      actions: {} // 异步操作
    };
    Object.keys({ ...defualtStore, ...store }).forEach((item) => {
      this[item] = store[item];
    });
    const handler = {
      // get(target, key, receiver) {
      //   if (Object.prototype.toString.call(target[key]) === '[object Object]') {
      //     return new Proxy(target[key], handler);
      //   }
      //   return Reflect.get(target, key, receiver);
      // },
      set(target, key, value, receiver) {
        const task = _this.observers[key] || [];
        if (task.length) {
          task.forEach((fun) => {
            // console.log(fun, value);
            fun(value);
          });
        }
        return Reflect.set(target, key, value, receiver);
      }
    };
    this.state = new Proxy(this.state, handler);
  }

  subScribe(key, callback) {
    if (!Reflect.has(this.observers, key)) {
      this.observers[key] = [];
    }
    this.observers[key].push(callback);
  }

  commit(mutation, data) {
    if (!Reflect.has(this.mutations, mutation)) {
      throw new Error('请先注册mutation');
    }
    this.mutations[mutation](this.state, data);
  }

  dispatch(action, payload = {}) {
    if (!Reflect.has(this.actions, action)) {
      throw new Error('Invalid action');
    }
    this.actions[action](this, payload);
  }
}
export default Store;
