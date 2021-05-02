using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace NearBy.Data.Interfaces
{
    public interface IAsyncRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<T> GetSingleAsync(ISpecification<T> spec);
        Task<T> GetSingleAsync(Expression<Func<T, bool>> filter);
        Task<List<T>> GetAllAsync();
        Task<List<T>> GetAsync(ISpecification<T> spec);
        Task<List<T>> GetAsync(Expression<Func<T, bool>> filter);
        Task<bool> ExistsAsync(Expression<Func<T, bool>> filter);
        Task<int> CountAsync(Expression<Func<T, bool>> filter);
        Task<T> AddAsync(T entity);
        Task<List<T>> AddRangeAsync(List<T> entity);
        Task UpdateAsync(T entity);
        Task<List<T>> UpdateRangeAsync(List<T> entity);
        Task DeleteAsync(T entity);
        Task DeleteAsyncById(Expression<Func<T, bool>> filter);
    }
}
