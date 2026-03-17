class TimerManager { 
    constructor() { 
        this.timers=new Map();   // 存储定时器的Map对象
    }

    addTimer(key,callback,interval=300000){ //时间默认5分钟
        if(this.timers.has(key)){
            this.clearTimer(key); 
        }
        const timerId=setInterval(callback,interval);
        this.timers.set(key,timerId);
    }
    clearTimer(key){
        if(this.timers.has(key)){
            clearInterval(this.timers.get(key));
            this.timers.delete(key);
        }
    }
    clearAllTimers(){
        this.timers.forEach((value,key)=>{
            clearInterval(value);
        });
        this.timers.clear();
    }
}
export default new TimerManager();