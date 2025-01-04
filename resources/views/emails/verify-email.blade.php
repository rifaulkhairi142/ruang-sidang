<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            text-align: center;
            padding: 20px 0;
        }
        .email-header img {
            max-height: 50px;
            margin-bottom: 10px;
        }
        .email-body {
            margin: 20px 0;
        }
        .email-body p {
            margin: 0 0 10px;
        }
        .verify-button {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            color: #ffffff !important;
            background: #1f2937;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .verify-button:hover {
            background: #2a3341;
        }
        .plain-url {
            margin-top: 10px;
            font-size: 14px;
            color: #007bff;
            word-break: break-all;
        }
        .email-footer {
            text-align: center;
            margin: 20px 0;
            font-size: 12px;
            color: #999;
        }
        .signature {
            margin-top: 20px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
       
            <h1>Verifikasi Email</h1>
        </div>
        <div class="email-body">
            <p>Halo {{ $user->name }},</p>
            <p>Terima kasih telah mendaftar! Silakan verifikasi alamat email Anda dengan mengklik tombol di bawah ini:</p>
            <a href="{{ $url }}" class="verify-button">Verifikasi Email</a>
            <p>Atau salin dan tempel URL berikut di browser Anda jika tombol tidak berfungsi:</p>
            <p class="plain-url">{{ $url }}</p>
            <p class="signature">Best regards,<br>Tim {{ config('app.name') }}</p>
        </div>
        <div class="email-footer">
            <p>&copy; {{ date('Y') }} {{ config('app.name') }}. Hak Cipta Dilindungi.</p>
        </div>
    </div>
</body>
</html>
