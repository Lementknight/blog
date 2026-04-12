---
title: "Contact"
url: "/contact/"
summary: "Get in touch"
---

Have a question about a post, or just want to say hi? Fill out the form below.

<form action="https://formspree.io/f/xzdknllp" method="POST">
  <input type="hidden" id="ref" name="ref" value="direct">
  <div style="margin-bottom: 1rem;">
    <label for="name" style="display:block; margin-bottom: .25rem;">Name</label>
    <input class="highlight" type="text" id="name" name="name" required
      style="width:100%; padding:.5rem; border:1px solid var(--border); border-radius:4px; background:var(--entry); color:var(--primary);">
  </div>
  <div style="margin-bottom: 1rem;">
    <label for="email" style="display:block; margin-bottom: .25rem;">Email</label>
    <input class="highlight" type="email" id="email" name="email" required
      style="width:100%; padding:.5rem; border:1px solid var(--border); border-radius:4px; background:var(--entry); color:var(--primary);">
  </div>
  <div style="margin-bottom: 1rem;">
    <label for="message" style="display:block; margin-bottom: .25rem;">Message</label>
    <textarea id="message" name="message" rows="6" required
      class="highlight"
      style="width:100%; padding:.5rem; border:1px solid var(--border); border-radius:4px; background:var(--entry); color:var(--primary); resize:vertical;"></textarea>
  </div>
  <button type="submit"
    style="padding:.5rem 1.25rem; background:var(--primary); color:var(--theme); border:none; border-radius:4px; cursor:pointer; font-size:1rem;">
    Send
  </button>
</form>

<script>
  const ref = new URLSearchParams(window.location.search).get('ref');
  if (ref) document.getElementById('ref').value = ref;
</script>
