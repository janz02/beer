/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const shell = require("shelljs");
const fs = require("fs-extra");

// TODO: Use final DNS, lookout for prod - staging differences
// 1. Get translation key list.
// shell
//   .ShellString(
//     shell.exec(
//       'curl -X GET "https://pkm-coupon-dev.grapetest.xyz/api/Information" -H "accept: text/plain"'
//     )
//   )
//   .to("src/app/i18n/backend-codes.ts");
// TODO: integrate.
const keys = [
  "error.common.internal",
  "error.auth.expired-refresh-token",
  "error.auth.invalid-email",
  "error.auth.invalid-refresh-token",
  "error.auth.invalid-password",
  "error.auth.ldap",
  "error.auth.ldap-password-change",
  "error.auth.login-failed",
  "error.auth.password-format",
  "error.auth.registration-failed",
  "error.auth.invalid-partner-code",
  "error.auth.user-exists",
  "error.auth.user-inactive",
  "error.auth.user-not-found",
  "error.auth.Forbidden",
  "error.cashier.stamp-couponId-not-unique",
  "error.cashier.cashier-couponId-not-unique",
  "error.coupon.already-claimed",
  "error.coupon.cannot-claim",
  "error.coupon.cant-change-state",
  "error.coupon.cant-be-deleted",
  "error.coupon.only-accepted-can-be-changed",
  "error.coupon-user-code.cant-save",
  "partnerContact.error.invalid-type",
  "error.email-template.not-found-version",
  "error.email-template.name-must-be-unique",
  "error.paginate.order-by;Cannot order by the given property",
  "error.paginate.page;Invalid page number",
  "error.paginate.page-size;Invalid page size",
  "error.partner.cant-change-state",
  "error.partner-contact.invalid-type",
  "error.not-found",
  "error.common.cant-modify",
  "error.common.field-number;This field must be a number.",
  "error.common.invalid-value;Invalid input value",
  "error.common.email-format;This field must be a valid e-mail.",
  "error.common.field-required;This field is required.",
  "error.common.password-format"
];

// 2. Remove old list stored in backend-codes.ts.
const fileName = "src/app/i18n/backend-codes.ts";
fs.removeSync(fileName);

// 3. Generate new backend-codes.ts with the new list.
fs.createFileSync(fileName);
let content = "import i18n from '.'";
content += keys.reduce((acc, key) => acc + `\ni18n.t('${key}')`, "");
content += "\n";
fs.appendFileSync(fileName, content);

// 4. Generate i18n files with scanner.
shell.exec("npm run i18n:generate");
