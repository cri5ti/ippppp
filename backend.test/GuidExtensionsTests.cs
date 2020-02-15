using IP5.Extensions;
using System;
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;
using Xunit;

namespace unit_tests
{
  public class GuidExtensionsTests
  {
    [Theory]
    [InlineData("abf5b8cf-7c5b-4d7b-8372-e10bf8320ef1")]
    [InlineData("8e96d1ce-9785-429b-98bb-82d0a2ae3922")]
    [InlineData("7A299521-342F-4E5D-AAD0-4F57DCD13469")]
    [InlineData("40D84485-1EE7-409F-8964-36D5C6D95FC4")]
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

  
  [MemoryDiagnoser]
  [ThreadingDiagnoser]
  public class GuidExtensionsBenchmark
  {
    public static void Main()
    {
      BenchmarkRunner.Run<GuidExtensionsBenchmark>();
    }
    
    [Benchmark]
    public string ToBase64() => Guid.NewGuid().ToBase64();
    
    [Benchmark]
    public string ToBase64Baseline() => Guid.NewGuid().ToBase64Baseline();
  }

  public static class GuidExtensionsBaseline
  {
    public static string ToBase64Baseline(this Guid guid)
    {
      var encoded = Convert.ToBase64String(guid.ToByteArray());
      encoded = encoded.Replace("/", "_").Replace("+", "-");
      return encoded.Substring(0, 22);
    }
  } 
}
