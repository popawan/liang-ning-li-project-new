export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const json = (obj, status = 200) =>
      new Response(JSON.stringify(obj), {
        status,
        headers: { "content-type": "application/json; charset=utf-8" },
      });

    // CORS（必要時開啟）
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
      });
    }

    // 健康檢查
    if (url.pathname === "/health" && request.method === "GET") {
      return json({ ok: true });
    }

    // 鎖定九宮格基準：只轉 Google 直連為 baseline_url
    if (url.pathname === "/baseline/lock" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const { ref_link, cache_days = 30 } = body || {};
      if (!ref_link) return json({ ok: false, note: "missing ref_link" }, 400);
      // 這裡不做下載與處理，直接當作可取用 URL
      return json({
        ok: true,
        baseline_url: ref_link,
        cache_until: new Date(Date.now() + cache_days * 86400e3).toISOString(),
        note: "locked (proxy)",
      });
    }

    // 接單：合成（僅回 accepted，不回 image_url）
    if (url.pathname === "/compose/selfie" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      // 這裡不做任何生成；你本地端自行處理
      return json({
        ok: true,
        final: false,       // 不是最終成品
        image_url: null,    // 重要：不回圖，避免 GPT 展示
        note: "accepted (proxy only)",
        meta: { mode: "proxy" },
      });
    }

    // 拍她（同樣僅代理）
    if (url.pathname === "/compose/photo_her" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      return json({
        ok: true,
        final: false,
        image_url: null,
        note: "accepted (proxy only)",
        meta: { mode: "proxy" },
      });
    }

    return json({ ok: false, note: "not_found" }, 404);
  },
};

