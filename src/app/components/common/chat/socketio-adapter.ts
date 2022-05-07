import { ChatAdapter, Message, ParticipantResponse } from "ng-chat";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ClaimService } from "../../../services/claim.service";
import { RxStompService } from "@stomp/ng2-stompjs";

export class SocketIOAdapter extends ChatAdapter {
    private socket: RxStompService;
    private claimService: ClaimService;
    private userId: string;
    private claimTopic: string;
    private claims = [];

    constructor(
        userId: string,
        socket: RxStompService,
        claimService: ClaimService,
        claimTopic: string
    ) {
        super();
        this.socket = socket;
        this.claimService = claimService;
        this.userId = userId;
        this.claimTopic = claimTopic;

        this.initializeSocketListeners();
    }

    public setClaimTopic(claimTopic) {
        if (this.claimTopic) return;
        this.claimTopic = claimTopic;

        const topic = `/${this.claimTopic.split("/").slice(5).join("/")}`;
        const username = sessionStorage.getItem("username");

        // this.socket?.on("messageReceived", (messageWrapper) => {
        // Handle the received message to ng-chat
        this.socket.watch(topic).subscribe((messageWrapper: any) => {
            try {
                const parsedBody = JSON.parse(messageWrapper.body);
                if (username === parsedBody?.from) return;
                const user = {
                    id: parsedBody.topic,
                    displayName: parsedBody.from,
                    status: 0,
                    avatar: "",
                    participantType: 0,
                };
                const message = {
                    type: 0,
                    fromId: parsedBody?.from,
                    toId: "",
                    message: parsedBody.message,
                    dateSent: Date.now(),
                } as unknown as Message;
                this.onMessageReceived(user, message);
            } catch {}
        });
    }

    listFriends(): Observable<ParticipantResponse[]> {
        // List connected users to show in the friends list
        // Sending the userId from the request body as this is just a demo
        return of([]);
    }

    getMessageHistory(claimId: any): Observable<Message[]> {
        // This could be an API call to your NodeJS application that would go to the database
        // and retrieve a N amount of history messages between the users.
        return this.claimService.retrieveClaim(claimId).pipe(
            map((claimData) => {
                return claimData.messages.map(
                    (message) =>
                        ({
                            type: 0,
                            fromId: message?.from?.userName || "",
                            toId: message?.to?.userName || "",
                            message: message.body,
                            dateSent: Date.now(),
                        } as unknown as Message)
                );
            })
        );
    }

    sendMessage(message: Message): void {
        const destination = `/${this.claimTopic.split("/").slice(5).join("/")}`;
        this.socket?.publish({
            destination,
            body: message.message,
        });
    }

    public initializeSocketListeners(): void {
        if (this.claimTopic) {
            const topic = `/${this.claimTopic.split("/").slice(5).join("/")}`;
            const username = sessionStorage.getItem("username");
            // Handle the received message to ng-chat
            this.socket.watch(topic).subscribe((messageWrapper: any) => {
                try {
                    const parsedBody = JSON.parse(messageWrapper.body);
                    if (username === parsedBody?.from) return;
                    const user = {
                        id: parsedBody.topic,
                        displayName: parsedBody.from,
                        status: 0,
                        avatar: "",
                        participantType: 0,
                    };
                    const message = {
                        type: 0,
                        fromId: parsedBody?.from || "",
                        toId: "",
                        message: parsedBody.message,
                        dateSent: Date.now(),
                    } as unknown as Message;
                    this.onMessageReceived(user, message);
                } catch {}
            });
        } else {
            const claimsTopic = "/topic/claims";
            this.socket.watch(claimsTopic).subscribe((messageWrapper: any) => {
                const parsedBody = JSON.parse(messageWrapper.body) as any;
                const added = {
                    participant: {
                        participantType: 0,
                        id: parsedBody.topic,
                        status: 0,
                        avatar: null,
                        displayName: parsedBody.from,
                    },
                    metadata: {
                        totalUnreadMessages: 0,
                    },
                };
                this.claims.push(added);
                // Handle the received message to ng-chat
                this.onFriendsListChanged(this.claims);
            });
        }
    }
}
