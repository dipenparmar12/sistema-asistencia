-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2019 at 08:10 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `temp`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` varchar(36) NOT NULL,
  `student_id` varchar(36) NOT NULL,
  `teacher_id` varchar(36) NOT NULL,
  `present` int(11) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `studentId` varchar(36) DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `student_id`, `teacher_id`, `present`, `createdAt`, `updatedAt`, `studentId`, `date`) VALUES
('0382b9b2-8bd5-45d4-b9ba-25ba792bcf98', '39d37639-8561-43a2-ab26-73ef4eaf8246', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:15.238228', '2019-10-04 11:39:15.238228', '39d37639-8561-43a2-ab26-73ef4eaf8246', '2019-10-04'),
('12d102ea-de40-4304-955a-0b1994356dbb', 'f38e7229-7523-433f-9c31-4ecf470c2d9c', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:14.801479', '2019-10-04 11:39:14.801479', 'f38e7229-7523-433f-9c31-4ecf470c2d9c', '2019-10-04'),
('1877cb40-fe6c-4728-a6a3-33821e89edf0', '89a7eaeb-c7c0-47bf-921e-331f218de2af', '3c6cf523-a151-4397-9cee-ddef591dca2a', 0, '2019-10-04 11:39:01.894255', '2019-10-04 11:39:01.894255', '89a7eaeb-c7c0-47bf-921e-331f218de2af', '2019-10-11'),
('437b16ab-0971-4f13-84ff-658c9d4357de', 'f38e7229-7523-433f-9c31-4ecf470c2d9c', '3c6cf523-a151-4397-9cee-ddef591dca2a', 0, '2019-10-04 11:39:01.946226', '2019-10-04 11:39:01.946226', 'f38e7229-7523-433f-9c31-4ecf470c2d9c', '2019-10-11'),
('4c9678ac-d8ed-4659-b238-e09910e94e1d', '309caa94-6879-4769-ac8f-f920daeef587', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:15.227237', '2019-10-04 11:39:15.227237', '309caa94-6879-4769-ac8f-f920daeef587', '2019-10-04'),
('66c62c64-46d7-47c7-8fd5-40d48515f89e', '89a7eaeb-c7c0-47bf-921e-331f218de2af', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:15.237230', '2019-10-04 11:39:15.237230', '89a7eaeb-c7c0-47bf-921e-331f218de2af', '2019-10-04'),
('6c91fbe3-47bb-4b3c-850c-65872553b50a', '309caa94-6879-4769-ac8f-f920daeef587', '3c6cf523-a151-4397-9cee-ddef591dca2a', 0, '2019-10-04 11:39:01.864271', '2019-10-04 11:39:01.864271', '309caa94-6879-4769-ac8f-f920daeef587', '2019-10-11'),
('9aa0e6f9-4afb-478f-bd53-7b566b5dcb0c', '3897e801-d9ee-438e-a956-9af1eba8fa50', '3c6cf523-a151-4397-9cee-ddef591dca2a', 0, '2019-10-04 11:39:01.866271', '2019-10-04 11:39:01.866271', '3897e801-d9ee-438e-a956-9af1eba8fa50', '2019-10-11'),
('a449d651-880f-4bc9-872a-9debbe88c2ed', '3897e801-d9ee-438e-a956-9af1eba8fa50', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:15.235229', '2019-10-04 11:39:15.235229', '3897e801-d9ee-438e-a956-9af1eba8fa50', '2019-10-04'),
('a9848ca1-abd7-43eb-a44d-db9f541cf037', 'aba8b6a8-b5c2-44b9-b868-26964ee777f0', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:15.234231', '2019-10-04 11:39:15.234231', 'aba8b6a8-b5c2-44b9-b868-26964ee777f0', '2019-10-04'),
('b87356de-1b60-4746-b389-bfb8d0c4c22e', '39d37639-8561-43a2-ab26-73ef4eaf8246', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:01.898252', '2019-10-04 11:39:01.898252', '39d37639-8561-43a2-ab26-73ef4eaf8246', '2019-10-11'),
('b8df45a6-5b52-4754-a5cd-11c9dfed9430', 'aba8b6a8-b5c2-44b9-b868-26964ee777f0', '3c6cf523-a151-4397-9cee-ddef591dca2a', 0, '2019-10-04 11:39:01.897254', '2019-10-04 11:39:01.897254', 'aba8b6a8-b5c2-44b9-b868-26964ee777f0', '2019-10-11'),
('bb66012c-a758-4553-abf7-12b1ceffa076', 'e9d224a7-8c53-46c8-89dc-76d895a589f1', '3c6cf523-a151-4397-9cee-ddef591dca2a', 0, '2019-10-04 11:39:02.056162', '2019-10-04 11:39:02.056162', 'e9d224a7-8c53-46c8-89dc-76d895a589f1', '2019-10-11'),
('d1c85134-a000-4512-87e2-bc7a2702f948', 'f47fa7db-d81b-4263-83fb-90100657b79c', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:15.232232', '2019-10-04 11:39:15.232232', 'f47fa7db-d81b-4263-83fb-90100657b79c', '2019-10-04'),
('d7d2fcae-4eb7-4b22-bd4d-22b26d96a27d', '41cba124-9e2b-4095-ba6e-c2ce5c364d7f', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:15.300194', '2019-10-04 11:39:15.300194', '41cba124-9e2b-4095-ba6e-c2ce5c364d7f', '2019-10-04'),
('e5f8013d-1fb5-47a0-9fa1-44b5033a086b', '41cba124-9e2b-4095-ba6e-c2ce5c364d7f', '3c6cf523-a151-4397-9cee-ddef591dca2a', 0, '2019-10-04 11:39:01.897254', '2019-10-04 11:39:01.897254', '41cba124-9e2b-4095-ba6e-c2ce5c364d7f', '2019-10-11'),
('ecbe2761-9602-4f46-af70-c07942ae8cb3', '3fc8ae5d-d7aa-4f6f-b203-2b7d23b4ea68', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:15.240227', '2019-10-04 11:39:15.240227', '3fc8ae5d-d7aa-4f6f-b203-2b7d23b4ea68', '2019-10-04'),
('ed1bd7b4-1232-4c51-8172-24b0cb226dcc', '3fc8ae5d-d7aa-4f6f-b203-2b7d23b4ea68', '3c6cf523-a151-4397-9cee-ddef591dca2a', 0, '2019-10-04 11:39:01.897254', '2019-10-04 11:39:01.897254', '3fc8ae5d-d7aa-4f6f-b203-2b7d23b4ea68', '2019-10-11'),
('f02bdbdb-5ff7-4694-ab77-12bf4a5a52a5', 'f47fa7db-d81b-4263-83fb-90100657b79c', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:01.983202', '2019-10-04 11:39:01.983202', 'f47fa7db-d81b-4263-83fb-90100657b79c', '2019-10-11'),
('fb403d27-5a35-48c5-8c02-af24500d6ff7', 'e9d224a7-8c53-46c8-89dc-76d895a589f1', '3c6cf523-a151-4397-9cee-ddef591dca2a', 1, '2019-10-04 11:39:15.228238', '2019-10-04 11:39:15.228238', 'e9d224a7-8c53-46c8-89dc-76d895a589f1', '2019-10-04');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` varchar(36) NOT NULL,
  `roll_no` int(11) NOT NULL,
  `enrollment_no` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `profile_pic` varchar(255) NOT NULL DEFAULT 'default.jpg',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `teacherId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `roll_no`, `enrollment_no`, `name`, `subject`, `email`, `mobile`, `address`, `profile_pic`, `createdAt`, `updatedAt`, `teacherId`) VALUES
('309caa94-6879-4769-ac8f-f920daeef587', 3, 3, 'Nishu', NULL, 'NISHU_dhf@f.com', '123123123', 'Okay this is Testing ', '3/1.jpg', '2019-10-04 10:51:42.783970', '2019-10-04 10:51:42.783970', '3c6cf523-a151-4397-9cee-ddef591dca2a'),
('3897e801-d9ee-438e-a956-9af1eba8fa50', 5, 5, 'PRAKASHSIR', NULL, 'PG@f.com', '123456389', 'Okay this is Testing ', '5/1.jpg', '2019-10-04 10:53:14.203928', '2019-10-04 10:53:14.203928', '3c6cf523-a151-4397-9cee-ddef591dca2a'),
('39d37639-8561-43a2-ab26-73ef4eaf8246', 1, 2, 'dipends', NULL, 'Dipend@g.com', '7878787878', 'Okay this is Testing ', '2/1.jpg', '2019-10-04 09:55:11.243822', '2019-10-04 09:55:11.243822', '3c6cf523-a151-4397-9cee-ddef591dca2a'),
('3fc8ae5d-d7aa-4f6f-b203-2b7d23b4ea68', 7, 7, 'Pri', NULL, 'PRI@f.com', '453456789', 'Okay this is Testing ', '7/1.jpg', '2019-10-04 10:55:31.283281', '2019-10-04 10:55:31.283281', '3c6cf523-a151-4397-9cee-ddef591dca2a'),
('41cba124-9e2b-4095-ba6e-c2ce5c364d7f', 6, 6, 'Namu', NULL, 'NAMU@f.com', '223456789', 'Okay this is Testing ', '6/1.jpg', '2019-10-04 10:54:18.631970', '2019-10-04 10:54:18.631970', '3c6cf523-a151-4397-9cee-ddef591dca2a'),
('89a7eaeb-c7c0-47bf-921e-331f218de2af', 9, 9, 'Jeel', NULL, 'JEel@f.com', '123456779', 'Okay this is Testing ', '9/1.jpg', '2019-10-04 11:01:00.601549', '2019-10-04 11:01:00.601549', '3c6cf523-a151-4397-9cee-ddef591dca2a'),
('aba8b6a8-b5c2-44b9-b868-26964ee777f0', 11, 11, 'NIMIT', NULL, 'MINI@f.com', '1223456789', 'Okay this is Testing ', '11/1.jpg', '2019-10-04 11:28:53.308473', '2019-10-04 11:28:53.308473', '3c6cf523-a151-4397-9cee-ddef591dca2a'),
('e9d224a7-8c53-46c8-89dc-76d895a589f1', 10, 10, 'PU', NULL, 'PU@f.com', '8918789', 'Okay this is Testing ', '10/1.jpg', '2019-10-04 11:03:49.624356', '2019-10-04 11:03:49.624356', '3c6cf523-a151-4397-9cee-ddef591dca2a'),
('f38e7229-7523-433f-9c31-4ecf470c2d9c', 8, 8, 'NEO', NULL, 'NEO@f.com', '145456789', 'Okay this is Testing ', '8/1.jpg', '2019-10-04 10:57:08.731692', '2019-10-04 10:57:08.731692', '3c6cf523-a151-4397-9cee-ddef591dca2a'),
('f47fa7db-d81b-4263-83fb-90100657b79c', 4, 4, 'RIAZ', NULL, 'Riaz@f.com', '1234567123', 'Okay this is Testing ', '4/1.jpg', '2019-10-04 10:52:14.995749', '2019-10-04 10:52:14.995749', '3c6cf523-a151-4397-9cee-ddef591dca2a');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` varchar(36) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `profile_pic` varchar(255) NOT NULL DEFAULT 'default.jpg',
  `roll` varchar(255) NOT NULL DEFAULT 'teacher',
  `dep_id` varchar(255) DEFAULT NULL,
  `is_logged` text,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `username`, `password`, `name`, `subject`, `email`, `mobile`, `address`, `profile_pic`, `roll`, `dep_id`, `is_logged`, `createdAt`, `updatedAt`) VALUES
('2063d395-6b5e-4bd0-bdcf-f7f66dc3f99c', 'dipends', '$2a$12$d/pfR0n2EDqRfihMjhl4guujt0msXpG5C/VTJi/9ShV5s30gxxMZa', 'admin', 'admin', 'a@a.com', NULL, NULL, 'default.jpg', 'principle', NULL, NULL, '2019-08-31 08:30:49.140760', '2019-08-31 08:30:49.140760'),
('3c6cf523-a151-4397-9cee-ddef591dca2a', 'mscit', '$2a$12$dUyLgcyrRVTRlu2V4qXWmeFhh0sTzWdnQDMK0a7B6vr.CPGgPL7tC', 'Mscit', 'Nodejs', 'M@m.com', NULL, NULL, 'default.jpg', 'teacher', NULL, NULL, '2019-09-03 19:25:34.165076', '2019-09-03 19:25:34.165076'),
('ba82b645-3ae4-4139-bfec-07edc2b23f27', 'movie', '$2a$12$.wbxiO1nghBWkL87hNTvauefa2PAIR3KnHlKPZeWJnOWHvxnbcGTi', 'Movies', 'Test', 'm@m.com', NULL, NULL, 'default.jpg', 'teacher', NULL, NULL, '2019-09-03 19:25:54.886682', '2019-09-03 19:25:54.886682');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_120e1c6edcec4f8221f467c8039` (`studentId`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_c48c71807c758060a6e0c1c42b` (`enrollment_no`),
  ADD KEY `FK_f4481746c56ffa6cf77829a4bcc` (`teacherId`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_76fd0cda3fc6719d3109237c72` (`username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `FK_120e1c6edcec4f8221f467c8039` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `FK_f4481746c56ffa6cf77829a4bcc` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
