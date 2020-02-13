using IP5.Extensions;
using System;
using Xunit;

namespace unit_tests
{
  public class GuidExtensionsTests
  {
    [Theory]
    [InlineData("abf5b8cf-7c5b-4d7b-8372-e10bf8320ef1")]
    [InlineData("8e96d1ce-9785-429b-98bb-82d0a2ae3922")]
    [InlineData("ffffffff-ffff-ffff-ffff-ffffffffffff")]
    [InlineData("00000000-0000-0000-0000-000000000000")]
    public void TestSerializationIsStable(string s)
    {
      Guid g = Guid.Parse(s);
      var b64 = g.ToBase64();
      var des = b64.ToGuid();
      Assert.Equal(g, des);
    }
  }
}
