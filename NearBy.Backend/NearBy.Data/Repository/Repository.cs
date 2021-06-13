using Microsoft.EntityFrameworkCore;
using NearBy.Data.Context;
using NearBy.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace NearBy.Data.Repository
{
    public class Repository<T> : IRepository<T>, IAsyncRepository<T> where T : BaseEntity
    {
        protected readonly DatabaseContext _dbContext;

        public Repository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public T GetById(int id)
        {
            return _dbContext.Set<T>().Find(id);
        }

        public virtual async Task<T> GetByIdAsync(int id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public T GetSingle(Expression<Func<T, bool>> filter)
        {
            return _dbContext.Set<T>().Where(filter).FirstOrDefault();
        }

        public async Task<T> GetSingleAsync(ISpecification<T> spec)
        {
            var queryWithIncludes = spec.Includes
                .Aggregate(_dbContext.Set<T>().AsQueryable(),
                (current, include) => current.Include(include));

            var queryResult = spec.IncludeStrings
                .Aggregate(queryWithIncludes,
                (current, include) => current.Include(include));

            return await queryResult.Where(spec.Filter).FirstOrDefaultAsync();
        }

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> filter)
        {
            return await _dbContext.Set<T>().Where(filter).FirstOrDefaultAsync();
        }

        public IEnumerable<T> Get(Expression<Func<T, bool>> filter)
        {
            return _dbContext.Set<T>().Where(filter).ToList();
        }

        public async Task<List<T>> GetAsync(Expression<Func<T, bool>> filter)
        {
            return await _dbContext.Set<T>().Where(filter).ToListAsync();
        }

        public async Task<List<T>> GetAsync(ISpecification<T> spec)
        {
            var queryWithIncludes = spec.Includes
                .Aggregate(_dbContext.Set<T>().AsQueryable(),
                (current, include) => current.Include(include));

            var queryResult = spec.IncludeStrings
                .Aggregate(queryWithIncludes,
                (current, include) => current.Include(include));

            return await queryResult.Where(spec.Filter).ToListAsync();
        }

        public IEnumerable<T> GetAll()
        {
            return _dbContext.Set<T>().AsEnumerable();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public T Add(T entity)
        {
            _dbContext.Set<T>().Add(entity);
            try
            {
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }


            return entity;
        }

        public async Task<T> AddAsync(T entity)
        {
            _dbContext.Set<T>().Add(entity);
            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }


            return entity;
        }

        public async Task<List<T>> AddRangeAsync(List<T> entity)
        {
            try
            {
                foreach (var item in entity)
                {
                    item.Id = 0;
                    _dbContext.Set<T>().Add(item);
                }
                await _dbContext.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<T>> UpdateRangeAsync(List<T> entity)
        {
            try
            {
                _dbContext.Set<T>().UpdateRange(entity);
                await _dbContext.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Update(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }

        public async Task UpdateAsync(T entity)
        {
            var local = _dbContext.Set<T>()
                .Local
                .FirstOrDefault(entry => entry.Id.Equals(entity.Id));

            // check if local is not null 
            if (local != null)
            {
                // detach
                _dbContext.Entry(local).State = EntityState.Detached;
            }
            // set Modified flag in your entry
            _dbContext.Entry(entity).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();
        }

        public void Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            _dbContext.SaveChanges();
        }

        public async Task DeleteAsync(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsyncById(Expression<Func<T, bool>> filter)
        {
            _dbContext.Set<T>().Where(filter);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<bool> ExistsAsync(Expression<Func<T, bool>> filter)
        {
            return await _dbContext.Set<T>().AnyAsync(filter);
        }

        public async Task<int> CountAsync(Expression<Func<T, bool>> filter)
        {
            return await _dbContext.Set<T>().CountAsync(filter);
        }


        public DataSet ExecuteSP(string spName, List<SqlParameter> sqlParameters)
        {
            DataSet dataSet = null;
            try
            {
                string ConnectionString = _dbContext.Database.GetDbConnection().ConnectionString;
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand(spName, conn))
                    {
                        cmd.CommandTimeout = 30;
                        using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                        {
                            try
                            {
                                dataSet = new DataSet();
                                adapter.SelectCommand.CommandType = CommandType.StoredProcedure;

                                foreach (SqlParameter sqlParameter in sqlParameters)
                                {
                                    cmd.Parameters.Add(sqlParameter);
                                }
                                adapter.Fill(dataSet);
                            }
                            catch (Exception ex)
                            {
                                throw ex;
                            }
                            finally
                            {
                                conn.Close();
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("OOPs, something went wrong.\n" + e);
            }
            return dataSet;
        }

    }
}
