using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace NearBy.Data.Interfaces
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Filter { get; }
        List<Expression<Func<T, object>>> Includes { get; }
        List<string> IncludeStrings { get; }
    }
}
