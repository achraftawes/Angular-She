import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import {
    ChatAdapter,
    IChatController,
    Localization,
    StatusDescription,
} from "ng-chat";
import { SocketIOAdapter } from "./socketio-adapter";
import { Observable } from "rxjs";
import { filter, map, pluck } from "rxjs/operators";
import { RxStompService } from "@stomp/ng2-stompjs";
import { StorageService } from "../../../services/storage.service";
import { RoleName } from "../../../models/role-name";
import { ClaimService } from "../../../services/claim.service";

@Component({
    selector: "app-chat",
    templateUrl: "./chat.component.html",
    styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
    userId: string;
    username: string;
    adapter: ChatAdapter;
    statusDescription: StatusDescription;
    localization: Localization;
    claimTopic$: Observable<string | null>;
    isFormer = false;
    canRender = false;

    @ViewChild("ngChatInstance", { static: false })
    protected ngChatInstance: IChatController;
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private claimService: ClaimService,
        private storageService: StorageService,
        private rxStompService: RxStompService
    ) {
        // this.initializeSocketListeners();
    }

    async handleCloseChat(event) {
        if (!this.isFormer) return;
        if (!confirm("Do you want to resolve this claim?")) return;
        await this.claimService.resolveClaim(event.id);
        alert("Claim resolved!");
    }

    ngOnInit(): void {
        this.claimTopic$ = this.storageService.storageChange$.pipe(
            filter(({ key }) => key === "claimTopic"),
            pluck("value"),
            map((value) => {
                const claimId = value.split("/")[value.split("/").length - 1];
                this.adapter = null;
                this.initializeSocketListeners(value);
                this.changeDetectorRef.detectChanges();
                this.ngChatInstance?.triggerOpenChatWindow({
                    id: claimId,
                    displayName: "claim",
                    status: 0,
                    avatar: "",
                    participantType: 0,
                });
                return claimId;
            })
        );
        this.claimTopic$.subscribe();

        this.userId = sessionStorage.getItem("username");
        const rolesRaw = sessionStorage.getItem("roles");
        if (!!rolesRaw) {
            try {
                const parsedRoles = JSON.parse(rolesRaw) as RoleName[];
                this.isFormer = parsedRoles.includes(RoleName.FORMER);
                if (this.isFormer) {
                    this.initializeSocketListeners();
                }
            } catch {}
        }

        this.statusDescription = {
            online: "open",
            busy: "answered",
            away: "answered",
            offline: "answered",
        };

        this.localization = {
            title: "Claims",
            messagePlaceholder: "Enter your message",
            searchPlaceholder: "Search claim by title",
            statusDescription: this.statusDescription,
            browserNotificationTitle: "New message received",
            loadMessageHistoryPlaceholder: "Loading previous messages...",
        };
    }

    public handleAutoOpened(user: any) {
        (this.adapter as any).setClaimTopic(
            `http://localhost:8086/SheApp/chat/topic/claim/${user.id}`
        );
    }
    // onParticipantClicked;
    public initializeSocketListeners(claimTopic = ""): void {
        // Initializing the chat with the userId and the adapter with the socket instance
        this.adapter = new SocketIOAdapter(
            sessionStorage.getItem("username"),
            this.rxStompService,
            this.claimService,
            claimTopic
        );
        this.userId = sessionStorage.getItem("username");
        this.canRender = true;
    }
}
