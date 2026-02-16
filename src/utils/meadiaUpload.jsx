import { createClient } from "@supabase/supabase-js";

const url = "https://iywzyppvuiptlzriuaws.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5d3p5cHB2dWlwdGx6cml1YXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDE4MzMsImV4cCI6MjA4MDA3NzgzM30.oJX6AA7gLFPY63KbNsgYf2VZn-I1H_VIb01oeARZjhM";

const supabase = createClient(url, key);

export default function uploadFile(file) {
	return new Promise((resolve, reject) => {
		const timeStamp = Date.now();
		const fileName = timeStamp + "_" + file.name;
		supabase.storage.from("images").upload(fileName, file, {
			cacheControl: "3600",
			upsert: false,
		}).then(
			() => {
				const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
				resolve(publicUrl);
			}
		).catch((error) => {
			reject(error);
		})
	});
}