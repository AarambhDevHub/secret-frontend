<script lang="ts">
	import { Card, CardHeader, CardTitle } from "@/components/ui/card";
	import CardContent from "@/components/ui/card/card-content.svelte";
	import { Separator } from "@/components/ui/select";
	import { onMount } from "svelte";

	// UserData interface for type-checking
	interface UserData {
		api_keys: string;
		createdAt: string;
		dbConnectionExists: boolean;
		email: string;
		encryption_method: string;
		id: string;
		name: string;
		updatedAt: string;
	}

	// Initialize user and secret ID
	let user: UserData | null = null;
	let secretId: string = "031c73e0-a342-4426-9f91-e3f6a5a74039"; // Example secret ID

	// Load user data from localStorage when the component is mounted
	onMount(() => {
		const data = localStorage.getItem("user");
		if (data) {
			user = JSON.parse(data);
		}
	});
</script>

<div class="p-4">
	<Card>
		<CardHeader>
			<CardTitle>Your API Key</CardTitle>
			<Separator />
		</CardHeader>
		<CardContent>
			{#if user}
				<!-- Display the API Key and example request -->
				<p><strong>API Key:</strong> {user.api_keys}</p>

				<!-- Example of how to use the API -->
				<p><strong>Example API Request to Access Secret:</strong></p>
				<pre class="p-4 rounded dark:bg-gray-800 bg-gray-100 my-2">
GET http://localhost:5173/api/key?key={user.api_keys}&secret={secretId}
</pre>

				<p><strong>Parameters:</strong></p>
				<ul class="list-disc ml-6">
					<li><strong>key</strong>: Your API key (as shown above)</li>
					<li><strong>secret</strong>: The ID of the secret you are trying to access (e.g., {secretId})</li>
				</ul>

				<!-- Expected response from the API -->
				<p><strong>Example API Response:</strong></p>
				<pre class="p-4 rounded dark:bg-gray-800 bg-gray-100 my-2">
{
`{ 
	value : "MySecretValue123" 
}`
}</pre>

				<p>Use this request in your favorite tool (e.g., Postman, cURL, or directly in the browser) to retrieve your secret data from the API using the API key.</p>
			{:else}
				<!-- Loading state if user data hasn't been fetched yet -->
				<p>Loading user data...</p>
			{/if}
		</CardContent>
	</Card>
</div>
