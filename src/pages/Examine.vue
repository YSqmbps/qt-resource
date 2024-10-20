<template>
  <div>
    <h1>5555555555555</h1>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
export default {
    name:"Examine",
    data(){
        return{
            examArr:[
                {
                    id:nanoid(),
                    name:"第一次考核",
                    beginTime:this.showTime(1728613183630),
                    endTime:this.showTime(1728613524152)
                }
            ],
        }
    },
    methods:{
        showTime(timeString){//传入时间戳，转化为具体时间
           let year = new Date(timeString).getFullYear()
           let month = new Date(timeString).getMonth()
           let day = new Date(timeString).getDate()
           let hour = new Date(timeString).getHours()
           let minute = new Date(timeString).getMinutes()
           let second = new Date(timeString).getSeconds()
           return `${year}-${month+1}-${day} ${hour}:${minute}:${second}` 
        }
    }
}
</script>

<style>

</style>