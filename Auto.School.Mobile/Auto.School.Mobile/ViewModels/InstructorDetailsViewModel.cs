﻿using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class InstructorDetailsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;

        public InstructorDetailsViewModel(IInstructorService instructorService, ISharedService sharedService)
        {
            _instructorService = instructorService;
            _sharedService = sharedService;
            LoadInstructor();
        }

        private void LoadInstructor()
        {
            Instructor = _sharedService.GetValue<InstructorModel>("instructor")!;
            IsLoading = false;
        }

        [ObservableProperty]
        private InstructorModel instructor;

        [ObservableProperty]
        private bool isLoading = true;

        [RelayCommand]
        public async Task SignUpToInstructor()
        {

        }
    }
}
