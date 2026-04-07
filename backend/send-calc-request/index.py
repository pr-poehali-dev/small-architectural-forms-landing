import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def handler(event: dict, context) -> dict:
    """Отправляет заявку с калькулятора на почту владельца студии."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body", "{}"))
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    email = body.get("email", "").strip()
    area = body.get("area", "")
    floors = body.get("floors", "")
    material = body.get("material", "")
    total = body.get("total", "")

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    smtp_from = os.environ.get("SMTP_FROM", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    to_email = "Artkov87@mail.ru"

    html_body = f"""
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0f0d0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0d0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1c1915;border-radius:16px;overflow:hidden;border:1px solid rgba(255,107,26,0.2);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#FF6B1A,#E8231A);padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.7);font-weight:500;">НОВАЯ ЗАЯВКА</p>
              <h1 style="margin:8px 0 0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">АРХ·СТУДИЯ</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <p style="margin:0 0 24px;font-size:15px;color:rgba(255,255,255,0.5);line-height:1.5;">
                Получена новая заявка с калькулятора стоимости. Клиент ожидает точный расчёт.
              </p>

              <!-- Contact info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
                <tr>
                  <td colspan="2" style="background:rgba(255,107,26,0.08);padding:12px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#FF6B1A;font-weight:600;">Контактные данные</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);width:40%;">
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;">Имя</p>
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <p style="margin:0;font-size:15px;color:#ffffff;font-weight:600;">{name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;">Телефон</p>
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <p style="margin:0;font-size:15px;color:#FF6B1A;font-weight:600;">{phone}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;">
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;">Email</p>
                  </td>
                  <td style="padding:14px 20px;">
                    <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.7);">{email if email else "—"}</p>
                  </td>
                </tr>
              </table>

              <!-- Calculation info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
                <tr>
                  <td colspan="2" style="background:rgba(255,107,26,0.08);padding:12px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#FF6B1A;font-weight:600;">Параметры расчёта</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);width:40%;">
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;">Площадь</p>
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <p style="margin:0;font-size:15px;color:#ffffff;font-weight:600;">{area} м²</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;">Этажей</p>
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <p style="margin:0;font-size:15px;color:#ffffff;font-weight:600;">{floors}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;">Материал</p>
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <p style="margin:0;font-size:15px;color:#ffffff;font-weight:600;">{material}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;">
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;">Расчётная сумма</p>
                  </td>
                  <td style="padding:14px 20px;">
                    <p style="margin:0;font-size:20px;color:#FF6B1A;font-weight:700;">{total} ₽</p>
                  </td>
                </tr>
              </table>

              <!-- CTA hint -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="background:linear-gradient(135deg,rgba(255,107,26,0.12),rgba(232,35,26,0.06));padding:20px 24px;border:1px solid rgba(255,107,26,0.15);border-radius:12px;">
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;">
                      💬 Клиент ждёт обратной связи. Рекомендуется связаться в течение <strong style="color:#FF6B1A;">1–2 часов</strong> для лучшей конверсии.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.2);">АРХ·СТУДИЯ — автоматическое уведомление с сайта</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с калькулятора — {name}"
    msg["From"] = smtp_from
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
        server.login(smtp_from, smtp_password)
        server.sendmail(smtp_from, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }
