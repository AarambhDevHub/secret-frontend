<script>
	import { Card, CardContent, CardHeader } from "@/components/ui/card";
	import UserDataForm from "./user-data-form.svelte";
	import { Separator } from "@/components/ui/separator";
	import PasswordChangeForm from "./password-change-form.svelte";

    export let data;

    $: userDataForm = data.userDataForm;
    $: passwordChangeForm = data.passwordChangeForm;
    $: userData = data.user || {
        id: "",
        name: "",
        email: "",
    };

</script>

<div class="p-4 flex items-center justify-center">
    <Card class="w-[900px]">
        <CardHeader>
            <p class="text-2xl font-semibold text-center">Profile</p>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
                <UserDataForm {userDataForm} {userData} />
            <div class="flex flex-col gap-4">
                <Separator />
                <div class="flex-2">
                    <PasswordChangeForm {passwordChangeForm} />
                </div>
            </div>
        </CardContent>
    </Card>
</div>