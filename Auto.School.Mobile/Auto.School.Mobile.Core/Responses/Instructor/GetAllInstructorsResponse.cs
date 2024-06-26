﻿using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Instructor
{
    public class GetAllInstructorsResponse : BaseResponse
    {
        [JsonProperty("data")]
        public List<InstructorModel>  Instructors { get; set; } = [];
    }
}
