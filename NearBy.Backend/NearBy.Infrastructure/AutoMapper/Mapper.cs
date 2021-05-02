using AutoMapper;

namespace NearBy.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //CreateMap<CenterAdminUserEntity, CenterAdminUserModel>();
            
            //CreateMap<QuestionEntity, QuestionModel>().
            //  ForMember(dest => dest.questionOptionModel, source => source.MapFrom(source => source.QuestionOptionEntities.OrderBy(x => x.Code)));

        }
    }
}
