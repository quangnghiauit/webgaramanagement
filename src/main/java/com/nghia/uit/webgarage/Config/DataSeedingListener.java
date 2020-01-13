//package com.nghia.uit.webgarage.Config;
//
//import com.nghia.uit.webgarage.Message.Constants;
//import com.nghia.uit.webgarage.Model.Car;
//import com.nghia.uit.webgarage.Model.Roles;
//import com.nghia.uit.webgarage.Model.UserRole;
//import com.nghia.uit.webgarage.Model.Users;
//import com.nghia.uit.webgarage.Repository.CarRepository;
//import com.nghia.uit.webgarage.Repository.RoleRepository;
//import com.nghia.uit.webgarage.Repository.UserRepository;
//import com.nghia.uit.webgarage.Repository.UserRoleRepository;
//import com.nghia.uit.webgarage.Service.CarManagementService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationListener;
//import org.springframework.context.event.ContextRefreshedEvent;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import java.security.Timestamp;
//import java.sql.Date;
//import java.text.DateFormat;
//import java.text.SimpleDateFormat;
//import java.util.HashSet;
//import java.util.Random;
//
//@Component
//public class DataSeedingListener implements ApplicationListener<ContextRefreshedEvent> {
//
//    @Autowired
//    private UserRoleRepository userRoleRepository;
//
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private CarRepository carRepository;
//
//    @Override
//    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
//        // Roles
//        if (roleRepository.findByRole("ADMIN") == null) {
//            roleRepository.save(new Roles("ADMIN"));
//        }
//
//        if (roleRepository.findByRole("CLIENT") == null) {
//            roleRepository.save(new Roles("CLIENT"));
//        }
//        if (roleRepository.findByRole("RECEPTIONIST") == null) {
//            roleRepository.save(new Roles("RECEPTIONIST"));
//        }
//
//        if (roleRepository.findByRole("ACCOUNTANT") == null) {
//            roleRepository.save(new Roles("ACCOUNTANT"));
//        }
//        if (roleRepository.findByRole("MECHANIC") == null) {
//            roleRepository.save(new Roles("MECHANIC"));
//        }
//
//                // Admin account
//        if (userRepository.findByUserName("quangnghiauit") == null&&userRoleRepository.findByUserName("quangnghiauit").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190311181159"));
//            admin.setUserName("quangnghiauit");
//            admin.setDisplayname("Nguyễn Quang Nghĩa");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            admin.setCreatedBy("quangnghiauit");
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setPhoneNumber("0976565715");
//            admin.setAddress("Quảng Bình");
//            admin.setEmail("quangnghiauit@gmail.com");
//
//            userRole.setUsername("quangnghiauit");
//            userRole.setRole("ADMIN");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //RECEPTIONIST
//        if (userRepository.findByUserName("MinhThu") == null&&userRoleRepository.findByUserName("MinhThu").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("201904111812239"));
//            admin.setUserName("MinhThu");
//            admin.setDisplayname("Trần Ngọc Minh Thư");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0862834533");
//            admin.setAddress("TP HCM");
//            admin.setEmail("MinhThu@gmail.com");
//
//            userRole.setUsername("MinhThu");
//            userRole.setRole("RECEPTIONIST");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //ACCOUNTANT
//        if (userRepository.findByUserName("NgocMinh") == null&&userRoleRepository.findByUserName("NgocMinh").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609125426"));
//            admin.setUserName("NgocMinh");
//            admin.setDisplayname("Trương Ngọc Minh");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0865456043");
//            admin.setAddress("TP HCM");
//            admin.setEmail("NgocMinh@gmail.com");
//
//            userRole.setUsername("NgocMinh");
//            userRole.setRole("ACCOUNTANT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //MECHANIC
//        if (userRepository.findByUserName("TinhTien") == null&&userRoleRepository.findByUserName("TinhTien").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609165139"));
//            admin.setUserName("TinhTien");
//            admin.setDisplayname("Đỗ Tịnh Tiến");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0375876196");
//            admin.setAddress("Hà Nội");
//            admin.setEmail("TinhTien@gmail.com");
//
//            userRole.setUsername("TinhTien");
//            userRole.setRole("MECHANIC");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //CLIENT
//        if (userRepository.findByUserName("PhuongLinh") == null&&userRoleRepository.findByUserName("PhuongLinh").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609265149"));
//            admin.setUserName("PhuongLinh");
//            admin.setDisplayname("Huỳnh Phương Linh");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0868089210");
//            admin.setAddress("Hà Nội");
//            admin.setEmail("PhuongLinh@gmail.com");
//
//            userRole.setUsername("PhuongLinh");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //CLIENT
//        if (userRepository.findByUserName("NgocAnh") == null&&userRoleRepository.findByUserName("NgocAnh").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200302"));
//            admin.setUserName("NgocAnh");
//            admin.setDisplayname("Nguyễn Ngọc Anh");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0982102828");
//            admin.setAddress("Hà Nội");
//            admin.setEmail("ngocanh@gmail.com");
//
//            userRole.setUsername("NgocAnh");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //CLIENT
//        if (userRepository.findByUserName("NgocDung") == null&&userRoleRepository.findByUserName("NgocDung").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200303"));
//            admin.setUserName("NgocDung");
//            admin.setDisplayname("Nguyễn Ngọc Dung");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0982102212");
//            admin.setAddress("TP HCM");
//            admin.setEmail("ngocdung@gmail.com");
//
//            userRole.setUsername("NgocDung");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //CLIENT
//        if (userRepository.findByUserName("ThanhTran") == null&&userRoleRepository.findByUserName("ThanhTran").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200304"));
//            admin.setUserName("ThanhTran");
//            admin.setDisplayname("Trần Thanh Thanh");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0982102232");
//            admin.setAddress("TP HCM");
//            admin.setEmail("thanhthanh98@gmail.com");
//
//            userRole.setUsername("ThanhTran");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //CLIENT
//        if (userRepository.findByUserName("ThanhBao") == null&&userRoleRepository.findByUserName("ThanhBao").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200305"));
//            admin.setUserName("ThanhBao");
//            admin.setDisplayname("Trần Bảo Thanh");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0982102232");
//            admin.setAddress("TP HCM");
//            admin.setEmail("thanhtran98@gmail.com");
//
//            userRole.setUsername("ThanhBao");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //CLIENT
//        if (userRepository.findByUserName("GiaBao") == null&&userRoleRepository.findByUserName("GiaBao").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200306"));
//            admin.setUserName("GiaBao");
//            admin.setDisplayname("Ngô Gia Bảo");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0213748282");
//            admin.setAddress("TP HCM");
//            admin.setEmail("giabao98@gmail.com");
//
//            userRole.setUsername("GiaBao");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //CLIENT
//        if (userRepository.findByUserName("DinhKhang") == null&&userRoleRepository.findByUserName("DinhKhang").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200307"));
//            admin.setUserName("DinhKhang");
//            admin.setDisplayname("Trần Đình Khang");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0982102232");
//            admin.setAddress("TP HCM");
//            admin.setEmail("Khangtran98@gmail.com");
//
//            userRole.setUsername("DinhKhang");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//
//        //CLIENT
//        if (userRepository.findByUserName("TuThanh") == null&&userRoleRepository.findByUserName("TuThanh").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200308"));
//            admin.setUserName("TuThanh");
//            admin.setDisplayname("Ngô Tú Thanh");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0213748282");
//            admin.setAddress("TP HCM");
//            admin.setEmail("TuThanh@gmail.com");
//
//            userRole.setUsername("TuThanh");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //CLIENT
//        if (userRepository.findByUserName("PhuongDuyen") == null&&userRoleRepository.findByUserName("PhuongDuyen").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200309"));
//            admin.setUserName("PhuongDuyen");
//            admin.setDisplayname("Trần Ngọc Phương Duyên");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0213748282");
//            admin.setAddress("TP HCM");
//            admin.setEmail("PhuongDuyen@gmail.com");
//
//            userRole.setUsername("PhuongDuyen");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//        //CLIENT
//        if (userRepository.findByUserName("KhangTruong") == null&&userRoleRepository.findByUserName("KhangTruong").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200310"));
//            admin.setUserName("KhangTruong");
//            admin.setDisplayname("Trương Hoàng Khang");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0213748282");
//            admin.setAddress("TP HCM");
//            admin.setEmail("KhangTruong98@gmail.com");
//
//            userRole.setUsername("KhangTruong");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//
//        //CLIENT
//        if (userRepository.findByUserName("MinhTuan") == null&&userRoleRepository.findByUserName("MinhTuan").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200311"));
//            admin.setUserName("MinhTuan");
//            admin.setDisplayname("Đỗ Minh Tuấn");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0213748282");
//            admin.setAddress("TP HCM");
//            admin.setEmail("MinhTuan98@gmail.com");
//
//            userRole.setUsername("MinhTuan");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//
//        //CLIENT
//        if (userRepository.findByUserName("VanThu") == null&&userRoleRepository.findByUserName("VanThu").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200312"));
//            admin.setUserName("VanThu");
//            admin.setDisplayname("Nguyễn Thu Vân");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0385440984");
//            admin.setAddress("TP HCM");
//            admin.setEmail("VanThu@gmail.com");
//
//            userRole.setUsername("VanThu");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//
//        //CLIENT
//        if (userRepository.findByUserName("HuynhTu") == null&&userRoleRepository.findByUserName("HuynhTu").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200313"));
//            admin.setUserName("HuynhTu");
//            admin.setDisplayname("Trần Ngọc Tú Huỳnh");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0865294462");
//            admin.setAddress("TP HCM");
//            admin.setEmail("HuynhTu@gmail.com");
//
//            userRole.setUsername("HuynhTu");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//
//        //CLIENT
//        if (userRepository.findByUserName("ThanhVu") == null&&userRoleRepository.findByUserName("ThanhVu").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200314"));
//            admin.setUserName("ThanhVu");
//            admin.setDisplayname("Trương Vũ Thanh");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0375382170");
//            admin.setAddress("TP HCM");
//            admin.setEmail("ThanhVu98@gmail.com");
//
//            userRole.setUsername("ThanhVu");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//
//        //CLIENT
//        if (userRepository.findByUserName("YThien") == null&&userRoleRepository.findByUserName("YThien").size()==0) {
//            Users admin = new Users();
//            UserRole userRole = new UserRole();
//            admin.setUserID(Long.valueOf("20190609200315"));
//            admin.setUserName("YThien");
//            admin.setDisplayname("Đỗ Thiện Ý");
//            admin.setPassword(passwordEncoder.encode("123456"));
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            java.util.Date date = new java.util.Date();
//            admin.setCreatedDate(dateFormat.format(date));
//            admin.setCreatedBy("quangnghiauit");
//            admin.setPhoneNumber("0365843802");
//            admin.setAddress("TP HCM");
//            admin.setEmail("YThien98@gmail.com");
//
//            userRole.setUsername("YThien");
//            userRole.setRole("CLIENT");
//            userRepository.save(admin);
//            userRoleRepository.save(userRole);
//        }
//
//
//
//
//    }
//}
