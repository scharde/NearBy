namespace NearBy.Model.Response
{
    public class ResponseModel
    {
        public bool Status { get; set; }
        public SuccessModel Success { get; set; }
        public FailedModel Failed { get; set; }
    }

    public class SuccessModel
    { 
        public int Id { get; set; }
        public string Message { get; set; }
    }


    public class FailedModel
    {
        public string Message { get; set; }
        public string Exception { get; set; }
    }
}
