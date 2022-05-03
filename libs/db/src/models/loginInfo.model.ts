import { modelOptions, Prop, Ref } from "@typegoose/typegoose";
import { User } from "./users.model";

@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})
export class LoginInfo {
    
    @Prop({ref: () => User})
    user!: Ref<User>;

    @Prop({type: String})
    loginType!: String;

    @Prop({type: String})
    loginAddress!: String;
    
}