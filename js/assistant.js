(() => {
  if (window.WanderlyAssistant) return;
  window.WanderlyAssistant = true;

  const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

  const styles = document.createElement('style');
  styles.textContent = `
    .chat-toggle{position:fixed;right:20px;bottom:20px;z-index:60;border:0;border-radius:50%;width:58px;height:58px;cursor:pointer;background:var(--accent);color:var(--navy);font:700 13px 'DM Sans',sans-serif;box-shadow:0 12px 28px -12px rgba(5,31,32,.7);display:flex;align-items:center;justify-content:center;gap:0;transition:transform .2s;}
    .chat-toggle:hover{transform:translateY(-2px);}
    .chat-toggle .chat-ico{font-size:20px;line-height:1;}
    .chat-panel{position:fixed;right:20px;bottom:90px;z-index:60;width:min(360px,calc(100vw - 40px));display:flex;flex-direction:column;border:1px solid var(--line);border-radius:14px;background:var(--mist);box-shadow:0 24px 50px -24px rgba(5,31,32,.65);overflow:hidden;transform:translateY(16px);opacity:0;visibility:hidden;transition:transform .25s ease,opacity .25s ease,visibility .25s;}
    .chat-panel.open{transform:translateY(0);opacity:1;visibility:visible;}
    .chat-head{padding:15px 18px;background:var(--navy);color:var(--white);display:flex;justify-content:space-between;align-items:center;}
    .chat-head strong{font:600 15px Fraunces,serif;}
    .chat-head span{color:var(--accent);font:500 10px 'DM Mono',monospace;letter-spacing:.1em;text-transform:uppercase;}
    .chat-close{border:0;background:transparent;color:var(--white);cursor:pointer;font-size:16px;line-height:1;}
    .chat-msgs{flex:1;min-height:220px;max-height:320px;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;}
    .chat-msg{max-width:85%;padding:9px 13px;border-radius:14px;font-size:13.5px;line-height:1.5;}
    .chat-msg.assistant{align-self:flex-start;background:#fff;color:var(--navy);border:1px solid var(--line);}
    .chat-msg.user{align-self:flex-end;background:var(--green);color:#daf1de;}
    .chat-msg.typing{align-self:flex-start;color:var(--ink-soft);}
    .chat-msg.hint{align-self:flex-start;color:var(--ink-soft);font-size:11.5px;background:transparent;border:0;padding:0 4px;}
    .chat-suggestion{border:1px solid var(--line);border-radius:10px;background:#fff;padding:11px 13px;margin-top:8px;}
    .chat-suggestion:first-of-type{margin-top:0;}
    .chat-sugg-top{display:flex;justify-content:space-between;align-items:center;gap:8px;}
    .chat-sugg-top strong{font:600 15px Fraunces,serif;color:var(--navy);}
    .chat-area{color:var(--green-dark);border-radius:12px;background:#dff7e6;padding:2px 8px;font:500 10px 'DM Mono',monospace;}
    .chat-sugg-meta{display:block;color:var(--ink-soft);font-size:11.5px;margin:3px 0 9px;}
    .chat-see{border:0;border-radius:16px;cursor:pointer;background:var(--accent);color:var(--navy);padding:6px 12px;font:700 11px 'DM Sans',sans-serif;}
    .chat-see:hover{background:#daf1de;}
    .chat-input{display:flex;gap:8px;padding:12px 16px 16px;border-top:1px dashed var(--line);}
    .chat-field{flex:1;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--navy);padding:9px 12px;font:500 13px 'DM Sans',sans-serif;}
    .chat-field:focus{outline:2px solid var(--blue);outline-offset:1px;}
    .chat-send{border:0;border-radius:12px;cursor:pointer;background:var(--green);color:#daf1de;padding:0 16px;font:700 12px 'DM Sans',sans-serif;white-space:nowrap;}
    .chat-send:hover{background:#0f5a3e;}
    @media (max-width:520px){.chat-toggle{right:14px;bottom:14px;}.chat-panel{right:14px;bottom:82px;}}
  `;
  document.head.appendChild(styles);

  const toggle = document.createElement('button');
  toggle.className = 'chat-toggle';
  toggle.setAttribute('aria-label', 'Open trip assistant');
  toggle.innerHTML = '<span class="chat-ico">✦</span>';

  const panel = document.createElement('div');
  panel.className = 'chat-panel';
  panel.innerHTML = `
    <div class="chat-head"><strong>Wanderly — Trip Assistant</strong><span>Dream search</span><button class="chat-close" aria-label="Close assistant">&times;</button></div>
    <div class="chat-msgs"></div>
    <div class="chat-input"><input class="chat-field" type="text" placeholder="Describe your dream place..." aria-label="Describe your dream place"><button class="chat-send" type="button">Send</button></div>`;

  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  const msgs = panel.querySelector('.chat-msgs');
  const inputRow = panel.querySelector('.chat-input');
  const field = panel.querySelector('.chat-field');
  const sendBtn = panel.querySelector('.chat-send');

  const addMessage = (text, who) => {
    const div = document.createElement('div');
    div.className = `chat-msg ${who}`;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  };

  const showTyping = () => {
    const div = document.createElement('div');
    div.className = 'chat-msg assistant typing';
    div.textContent = '…';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  };

  const renderSuggestions = (suggestions, interests) => {
    const container = document.createElement('div');
    container.className = 'chat-msg assistant';
    suggestions.forEach((destination) => {
      const item = document.createElement('div');
      item.className = 'chat-suggestion';
      item.innerHTML = `
        <div class="chat-sugg-top"><strong>${destination.name}</strong><span class="chat-area">${destination.area}</span></div>
        <span class="chat-sugg-meta">${destination.region} · ${destination.match}% match</span>
        <button class="chat-see" type="button">See matches →</button>`;
      item.querySelector('.chat-see').addEventListener('click', () => {
        window.location.href = `results.html?interests=${encodeURIComponent(interests)}`;
      });
      container.appendChild(item);
    });
    msgs.appendChild(container);
    msgs.scrollTop = msgs.scrollHeight;
  };

  const addHint = () => {
    const div = document.createElement('div');
    div.className = 'chat-msg hint';
    div.textContent = 'e.g. "snowy mountains and hiking" · "romantic beaches for a honeymoon" · "street food and night markets"';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  };

  const send = (text) => {
    const value = (text || '').trim();
    if (!value) {
      field.focus();
      return;
    }
    addMessage(value, 'user');
    field.value = '';
    const typing = showTyping();
    fetch('/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: value }),
    })
      .then((response) => response.json())
      .then((data) => {
        typing.remove();
        if (data.suggestions && data.suggestions.length) {
          addMessage(data.message, 'assistant');
          renderSuggestions(data.suggestions, data.interests || '');
          addMessage('Describe another dream place, or keep refining below.', 'assistant');
        } else {
          addMessage(data.message, 'assistant');
        }
        field.focus();
      })
      .catch(() => {
        typing.remove();
        const mock = MOCK_suggest(value);
        if (mock.suggestions.length) {
          addMessage('Got it — here are places that fit what you described: (offline demo)', 'assistant');
          renderSuggestions(mock.suggestions, mock.interests);
          addMessage('Describe another dream place, or keep refining below.', 'assistant');
        } else {
          addMessage("Hmm, I couldn't pin that down. Try describing what you love — like \"romantic sunset beaches\" or \"ancient temples and street food\".", 'assistant');
        }
        field.focus();
      })
      .finally(() => field.focus());
  };

  sendBtn.addEventListener('click', () => send(field.value));
  field.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') send(field.value);
  });

  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    if (isOpen && !msgs.children.length) {
      addMessage('Define your dream place for a tour — tell me what you love in your own words.', 'assistant');
      addHint();
      field.focus();
    }
  });

  panel.querySelector('.chat-close').addEventListener('click', () => panel.classList.remove('open'));
})();
