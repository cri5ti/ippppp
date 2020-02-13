using System;

namespace IP5.Extensions
{
	public static class GuidExtensions
	{
		public static string ToBase64(this Guid guid)
		{
			var encoded = Convert.ToBase64String(guid.ToByteArray());
			encoded = encoded.Replace("/", "-").Replace("+", "-");
			return encoded.Substring(0, 22);
		}

		public static Guid ToGuid(this string value)
		{
			value = value.Replace("_", "/").Replace("-", "+");
			var buffer = Convert.FromBase64String(value + "==");
			return new Guid(buffer);
		}
	}
}