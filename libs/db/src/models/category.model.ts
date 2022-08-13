import { ModelOptions, Prop, Ref } from "@typegoose/typegoose";
import { User } from "./users.model";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
    }
})
export class Category {

    @Prop({ref: () => Category})
    pid?: Ref<Category> | null;

    @Prop()
    name: string;
    

    @Prop({ref: ()=> User})
    author?: Ref<User>
}