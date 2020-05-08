# WIP script to generate all backend related code, and moving away from Node during CI because of its instability
# Will try to add retrys to javascript file first, but planning to create a full build pipeline in this script


$expections = @(Invoke-WebRequest -Uri "https://pkm-coupon-dev.grapetest.xyz/api/Information" |
  ConvertFrom-Json |
  % { $_.Split([Environment]::NewLine) } |
  % { "i18n.t('$_')" }
)

$notis = @(Invoke-WebRequest -Uri "https://pkm-coupon-dev.grapetest.xyz/api/Notifications/Types" |
  ConvertFrom-Json |
  % { $_.Split([Environment]::NewLine) } |
  % { "i18n.t('$_')" }
)

Set-Content -Path "src/app/i18n/backend-codes.ts" "import i18n from '.'"

$expections | % { Add-Content -Path "src/app/i18n/backend-codes.ts" $_ }
$notis | % { Add-Content -Path "src/app/i18n/backend-codes.ts" $_ }

npm run i18n:generate