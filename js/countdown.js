(function () {
  var banner = document.getElementById('countdown-banner');
  var display = document.getElementById('countdown-display');
  if (!banner || !display) return;

  function endOfApril15(year) {
    return new Date(year, 3, 15, 23, 59, 59, 999);
  }

  function getDeadline() {
    var now = new Date();
    var y = now.getFullYear();
    var end = endOfApril15(y);
    if (now > end) return null;
    return end;
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function formatRemaining(ms) {
    if (ms <= 0) return null;
    var sec = Math.floor(ms / 1000);
    var d = Math.floor(sec / 86400);
    sec %= 86400;
    var h = Math.floor(sec / 3600);
    sec %= 3600;
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    var parts = [];
    if (d > 0) parts.push(d + (d === 1 ? ' day' : ' days'));
    parts.push(pad(h) + ':' + pad(m) + ':' + pad(s));
    return parts.join(' · ');
  }

  var deadline = getDeadline();
  if (!deadline) {
    banner.setAttribute('hidden', '');
    document.body.classList.add('countdown-expired');
    return;
  }

  document.body.classList.add('has-countdown-banner');
  banner.removeAttribute('hidden');

  function tick() {
    var left = deadline.getTime() - Date.now();
    var text = formatRemaining(left);
    if (!text) {
      banner.setAttribute('hidden', '');
      document.body.classList.remove('has-countdown-banner');
      document.body.classList.add('countdown-expired');
      return;
    }
    display.textContent = text;
  }

  tick();
  setInterval(tick, 1000);
})();
