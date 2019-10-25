import { bindActionCreators } from 'redux'
import  store  from '../store/store'
import * as actions from '../store/dialog/dialog'
const signalR = require("@aspnet/signalr")

const { dispatch } = store

const { setDialog, clearDialog, addMessage, setDialogError, 
    dialogLoading, addPreviousMessages, readMessage, deleteDialogError} = 
    bindActionCreators(actions, dispatch)

export default class dialogHub {

    constructor() {
        let hubUrl = `${process.env.REACT_APP_API_URL_DEBUG}/chat`;
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, { accessTokenFactory: () => `${localStorage.getItem('token')}`})
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }

    connect(dialogId) {
        this.dialogId = dialogId
        dialogLoading(true)
        this.hubConnection
            .start()
            .then(() => {
                this.hubConnection
                    .invoke("ConnectToDialogue", this.dialogId)
            })
            .catch(err => {
                dialogLoading(false)
                setDialogError(["Error."])
            });

        this.hubConnection.on("GetDialog", function (data) {
            setDialog(data)
            dialogLoading(false)
        })    

        this.hubConnection.on("LoadPreviousMessages", function (data) {
            addPreviousMessages(data);
            dialogLoading(false)
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
            .catch(err => {
                console.log(err)
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
                setDialogError(["Message not send."])
                setTimeout(deleteDialogError, 5000);
                return false;
            });
    }

    loadPreviousMessages(requestNumber){
        dialogLoading(true)
        this.hubConnection
            .invoke("LoadPreviousMessages", this.dialogId, requestNumber)
            .catch(err => {
                setDialogError(["Cant load previous messages"])
                setTimeout(deleteDialogError, 5000);
                dialogLoading(false)
            })
    }

    stop() {
        this.hubConnection
            .stop()
            .catch(err => console.error(err));
        clearDialog();
    }
}