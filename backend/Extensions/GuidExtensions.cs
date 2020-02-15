using System;
using System.Buffers.Text;
using System.Runtime.InteropServices;

namespace IP5.Extensions
{
	public static class GuidExtensions
	{
		private const byte ForwardSlashByte = (byte)'/';
		private const byte PlusByte = (byte)'+';
		private const char Underscore = '_';
		private const char Dash = '-';
		
		public static string ToBase64(this Guid guid)
		{
			Span<byte> raw = stackalloc byte[16];
			Span<byte> utf8 = stackalloc byte[24];
			MemoryMarshal.TryWrite(raw, ref guid);
			Base64.EncodeToUtf8(raw, utf8, out _, out _);
			Span<char> b64 = stackalloc char[22];
			for (var i = 0; i < 22; i++)
			{
				b64[i] = utf8[i] switch
				{
					ForwardSlashByte => Underscore,
					PlusByte => Dash,
					_ => (char) utf8[i]
				};
			}
			return new string(b64);
		}

		public static Guid ToGuid(this string value)
		{
			value = value.Replace("_", "/").Replace("-", "+");
			var buffer = Convert.FromBase64String(value + "==");
			return new Guid(buffer);
		}
	}
}