/**
 * Notre Gemme — newsletter + drop-alert sign-up backend (Google Apps Script).
 *
 * The website's /api/subscribe route POSTs { email, list, site } here.
 * Each sign-up is appended to a Google Sheet; duplicates (same email +
 * list) are ignored. Zero monthly cost.
 *
 * ─── DEPLOY (5 minutes) ────────────────────────────────────────────
 * 1. Create a Google Sheet named "Notre Gemme — Sign-ups". Copy its ID
 *    from the URL (between /d/ and /edit) into SHEET_ID below.
 * 2. Go to https://script.google.com → New project → paste this file.
 * 3. Deploy → New deployment → Web app
 *      Execute as: Me      Who has access: Anyone
 * 4. Copy the Web app URL (ends in /exec).
 * 5. Vercel → Project → Settings → Environment Variables:
 *      SUBSCRIBE_SCRIPT_URL = <the /exec URL>   (Production + Preview)
 *    Server-only: never prefix it with NEXT_PUBLIC_.
 * 6. Redeploy the site. Until then the forms offer WhatsApp instead.
 *
 * After editing this script: Deploy → Manage deployments → edit →
 * Version: New version → Deploy. The /exec URL stays the same.
 */

var SHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";
var SHEET_NAME = "Sign-ups";
var HEADERS = ["Timestamp", "Email", "List", "Site"];
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var ALLOWED_LISTS = ["newsletter", "drop"];

/**
 * Handles a sign-up POST from /api/subscribe.
 *
 * @param {GoogleAppsScript.Events.DoPost} e - POST event with JSON body
 * @returns {GoogleAppsScript.Content.TextOutput} JSON { ok: boolean }
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var email = String(data.email || "").trim().toLowerCase();
    var list = ALLOWED_LISTS.indexOf(data.list) >= 0 ? data.list : "newsletter";
    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return respond({ ok: false, error: "invalid email" });
    }

    var sheet = getSheet();
    if (!alreadySubscribed(sheet, email, list)) {
      sheet.appendRow([new Date(), email, list, String(data.site || "")]);
    }
    return respond({ ok: true });
  } catch (err) {
    console.error(err);
    return respond({ ok: false, error: "server error" });
  }
}

/** Opens (or creates) the sign-ups tab with a header row. */
function getSheet() {
  var book = SpreadsheetApp.openById(SHEET_ID);
  var sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

/** True when this email is already on this list. */
function alreadySubscribed(sheet, email, list) {
  var rows = sheet.getLastRow() - 1;
  if (rows < 1) return false;
  var values = sheet.getRange(2, 2, rows, 2).getValues();
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] === email && values[i][1] === list) return true;
  }
  return false;
}

/** Serialises a JSON response. */
function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
