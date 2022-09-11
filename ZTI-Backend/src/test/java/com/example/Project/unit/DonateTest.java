package com.example.Project.unit;

import com.example.Project.common.PetType;
import com.example.Project.common.UserRole;
import com.example.Project.database.entity.Donate;
import com.example.Project.database.entity.Pet;
import com.example.Project.database.entity.User;
import com.example.Project.database.repository.DonateRepository;
import com.example.Project.database.repository.PetRepository;
import com.example.Project.database.repository.UserRepository;
import com.example.Project.dto.DonateDto;
import com.example.Project.exception.NotFoundException;
import com.example.Project.mapper.DonateMapper;
import com.example.Project.service.DonateService;
import com.example.Project.service.impl.DonateServiceImpl;
import org.assertj.core.api.Assertions;
import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import javax.xml.bind.ValidationException;
import java.io.IOException;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class DonateTest {
    @InjectMocks
    private DonateServiceImpl donateService;

    @Mock
    private DonateRepository donateRepository;

    @Spy
    @InjectMocks
    private DonateMapper donateMapper;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PetRepository petRepository;

    @InjectMocks
    private DonateMapper spy = Mockito.spy(new DonateMapper());

    @Test
    public void shouldNotAddDonateWhenUserNotFound() throws IOException {
        DonateDto donateDto = DonateDto.builder().petId(1L).userId(1L).money(15.50).build();
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.empty());
        Assertions.assertThatThrownBy(() -> donateService.addDonate(donateDto))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    public void shouldNotAddDonateWhenPetNotFound() throws IOException {
        DonateDto donateDto = DonateDto.builder().petId(1L).userId(1L).money(15.50).build();
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(new User()));
        Mockito.when(petRepository.findById(1L)).thenReturn(Optional.empty());
        Assertions.assertThatThrownBy(() -> donateService.addDonate(donateDto))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    public void shouldNotAddDonateWhenUserExistsAndPetExistsAndNotEnoughMoneyOnAccount() throws IOException {
        DonateDto donateDto = DonateDto.builder().petId(1L).userId(1L).money(15.50).build();
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(new User(1L, 10.00, UserRole.STANDARD, "Rys", "password")));
        Mockito.when(petRepository.findById(1L)).thenReturn(Optional.of(new Pet()));
        Assertions.assertThatThrownBy(() -> donateService.addDonate(donateDto))
                .isInstanceOf(ValidationException.class);
    }

    @Test
    public void shouldAddDonateWhenUserExistsAndPetExistsAndEnoughMoneyOnAccount() throws IOException, ValidationException {
        DonateDto donateDto = DonateDto.builder().petId(1L).userId(1L).money(15.50).build();
        User user = new User(1L, 20.00, UserRole.STANDARD, "Rys", "password");
        Pet pet = new Pet(":)",
               1L,
                PetType.CAT,
                1,
                "",
                null);
        Donate donate = new Donate(null, user, pet, donateDto.getMoney());
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        Mockito.when(userRepository.getById(1L)).thenReturn(user);
        Mockito.when(petRepository.findById(1L)).thenReturn(Optional.of(pet));
        Mockito.when(donateRepository.save(donate)).thenReturn(new Donate(1L, user, pet, donateDto.getMoney()));
        donateService.addDonate(donateDto);
        Mockito.verify(donateRepository, Mockito.times(1)).save(donateMapper.map(donateDto));
    }
}
