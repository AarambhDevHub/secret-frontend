<script>
	import { Toaster } from "@/components/ui/sonner";
    import '../app.css';
	import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher defaultTheme="dark" defaultMode="light" />
<Toaster richColors />
<slot />
