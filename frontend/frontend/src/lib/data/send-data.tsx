export async function sendData(url: string, data: any) {
    console.log("Sending data:", data);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to submit data");
    }

    const responseData = await response.json();
    console.log("Received response:", responseData);

    return responseData;
}
