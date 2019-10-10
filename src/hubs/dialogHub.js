import { bindActionCreators } from 'redux'
import  store  from '../store/store'
import * as actions from '../store/dialog/dialog'
const signalR = require("@aspnet/signalr")

const { dispatch } = store

const { setDialog, clearDialog, addMessage, setDialogError, 
    dialogLoading, addPreviousMessages, readMessage} = 
    bindActionCreators(actions, dispatch)

export default class dialogHub {

    constructor() {
        let hubUrl = 'https://localhost:44307/api/chat';
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, { accessTokenFactory: () => `${localStorage.getItem('token')}`})
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }

    connect(dialogId) {
        this.dialogId = dialogId
        dialogLoading()
        this.hubConnection
            .start()
            .then(() => {
                this.hubConnection
                    .invoke("ConnectToDialogue", this.dialogId)
                    .then(() => console.log('Connection to dialogue'))
            })
            .catch(err => console.log('Error while establishing connection: '));

        this.hubConnection.on("GetDialog", function (data) {
            setDialog(data)
            dialogLoading()
        })    

        this.hubConnection.on("LoadPreviousMessages", function (data) {
            addPreviousMessages(data);
        })

        this.hubConnection.on("ReceiveMessage", function (data) {
            addMessage(data);
        })

        this.hubConnection.on("ReadMessage", function (data) {
            const readMess = store.getState().dialog.dialog.messages.find(x => x.id === data)
            readMessage(readMess);
        })
    }
    
    readMessage(messageId) {
        return this.hubConnection
            .invoke("ReadMessage", messageId, this.dialogId)
            .then(() => {
                console.log("read mess request")
            })
            .catch(err => {
                console.error(err)
                return false;
            });
    }

    sendMessage(message) {
        return this.hubConnection
            .invoke("SendMessage", message)
            .then(() => {
                return true;
            })
            .catch(err => {
                console.error(err)
                return false;
            });
    }

    loadPreviousMessages(requestNumber){
        dialogLoading()
        this.hubConnection
            .invoke("LoadPreviousMessages", this.dialogId, requestNumber)
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                dialogLoading()
            })
    }

    stop() {
        this.hubConnection
            .stop()
            .catch(err => console.error(err));
        clearDialog();
    }
}