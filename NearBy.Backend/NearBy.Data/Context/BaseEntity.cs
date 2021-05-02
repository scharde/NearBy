using System.ComponentModel.DataAnnotations.Schema;

namespace NearBy.Data
{
    public class BaseEntity
    {
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }
}
