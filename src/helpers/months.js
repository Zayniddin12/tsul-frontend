export function getLong($t) {
  const long = [
    "",
    $t("yanvar"),
    $t("fevral"),
    $t("mart"),
    $t("aprel"),
    $t("may"),
    $t("iyun"),
    $t("iyul"),
    $t("august"),
    $t("sentabr"),
    $t("oktabr"),
    $t("noyabr"),
    $t("dekabr"),
  ];

  return long;
}

export function getShort($t) {
  const long = [
    "",
    $t("yan"),
    $t("fev"),
    $t("mrt"),
    $t("apr"),
    $t("my"),
    $t("iyn"),
    $t("iyl"),
    $t("aug"),
    $t("sen"),
    $t("okt"),
    $t("noy"),
    $t("dek"),
  ];

  return long;
}

export function days($t) {
  const long = [
    "",
    $t("Sunday"),
    $t("Monday"),
    $t("Tuesday"),
    $t("Wednesday"),
    $t("Thursday"),
    $t("Friday"),
    $t("Saturday"),
  ]
  return long
}
