<script>
    import { page } from '$app/stores'; // Import the page store to access the current route
	import Mode from '@/Mode.svelte';
	import LogoutButton from '../auth/logout-button.svelte';
	import { Button } from '../ui/button';
  
  </script>
  
  <header class="border-b">
    <div class="container mx-auto flex justify-between items-center p-4">
      <h1 class="text-2xl font-semibold">Secrets Management</h1>
      <nav>
        <div class="flex gap-x-2">
            <Button href="/secret" variant={$page.url.pathname.includes("/secret") ? "default" : "outline"}>
                Secret
            </Button>
            <Button href="/profile" variant={$page.url.pathname === "/profile" ? "default" : "outline"}>
                Profile
            </Button>
            <Button href="/apikey" variant={$page.url.pathname === "/apikey" ? "default" : "outline"}>
                Api Key
            </Button>
        </div>
    </nav>
      <div class="flex gap-4">
        <Mode />
        <LogoutButton />
      </div>
    </div>
  </header>
  