
// Extend the CloudflareEnv type to include API_DATA

async function fetchData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_DATA;
  if (!apiUrl) {
    throw new Error("API_DATA environment variable is not defined");
  }
  const res = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const jsonData = await res.json();
  return jsonData;
}

export default async function SimpleSSRComponent() {
  const currentDate = new Date().toUTCString();
  const greeting = "Hello, SSR Component!";

  const data = await fetchData();
  return (
    <div>
      <h1>{greeting}</h1>
      <p>
        This component is server-side rendered (SSR) and displays the current
        date:
      </p>
      <p>{currentDate}</p>
      <h2>Data Fetching Example (Server Component)</h2>
      <ul>
        {data.map((item: any) => (
          <div style={{ marginBottom: "20px" }} key={item.id}>
            {" "}
            <b>
              {item.id}. {item.title}
            </b>
            <p>{item.body}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
