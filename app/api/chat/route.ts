export async function POST(req: Request) {
  const { model, history, apikey, think } = await req.json();

  // 通义千问API参数
  const tongyiApiUrl = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation";
  console.log(apikey);
  const accessToken = apikey;
  var enableThink = false;
  var enableSearch = false;
  if(think == "think"){
    enableThink = true;
  }else if(think == "search"){
    enableSearch = true;
  }
  // 构造请求体
  const body = {
    model, // 例如 qwen-turbo、qwen-plus、qwen-max
    input: { messages: history.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })) },
    enable_thinking: enableThink,
    enable_search: enableSearch,
    stream: true,
    stream_options: {
        "include_usage": true
    },
  };
  console.log(JSON.stringify(body));

  const resp = await fetch(tongyiApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  console.log(resp.headers.get("Content-Type"), resp.headers.get("Transfer-Encoding"));
return new Response(resp.body, {
    status: resp.status,
    headers: {
      "Content-Type": resp.headers.get("Content-Type") || "application/octet-stream",
      // 其他需要的头
    }
  });
}