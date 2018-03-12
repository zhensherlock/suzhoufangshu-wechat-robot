import { Wechaty, Contact, Room } from 'wechaty'
import { groupMap } from '@/common/constant'
const bot = Wechaty.instance()
.on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`))
.on('login', async user => {
    console.log(`User ${user} logined`)
})
.on('message', async message => {
    /**
     * 过滤自己发给自己的消息
     * 过滤来自群聊的消息
     */
    if (message.self() || message.room() != null) {
        return
    }
    if (!groupMap.hasOwnProperty(message.obj.content)) {
        return
    }
    // 获取发送者
    const sender = message.from()
    // 获取需要邀请进入的群
    const dingRoom = await Room.find({ topic: groupMap[message.obj.content] })
    // 发送邀请
    await dingRoom.add(sender)
    // console.log(`Message: ${message}`)
})
.start()
