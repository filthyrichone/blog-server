import { ModelOptions, Prop, Ref } from "@typegoose/typegoose";
import { User } from "./users.model";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
    }
})
export class Tag {

    @Prop({ref: () => Tag})
    pid?: Ref<Tag>
    
    @Prop()
    name: string

    @Prop({ref: ()=> User})
    author?: Ref<User>
    
}