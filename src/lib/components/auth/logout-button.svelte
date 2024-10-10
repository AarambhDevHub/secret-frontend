<script>
	import { Button } from "../ui/button";
	import { goto } from "$app/navigation";
	import { toast } from "svelte-sonner";

    let isLoading = false;

    async function handleLogout() {
        // Perform the logout by sending a POST request to the logout endpoint
        isLoading = true;
        try {
            const response = await fetch('/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Handle the redirection
            if (response.ok) {
                toast.success("Logout successful! Redirecting to login...");
                setTimeout(() => goto('/login'), 1000); 
            } else {
                console.error('Logout failed');
            }
        } catch(error) {
            console.log(error, 'error')
        }
        
        isLoading = false;
    }


</script>
<Button on:click={handleLogout} {isLoading} variant='outline'>
    Logout
</Button>