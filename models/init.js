import sqlite3 from 'sqlite3';
import process from 'process';

import { dbPath } from '../config';
import { logger } from '../utils';


export const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
  if (err) {
    logger.error(err);
    process.exit(1);
  } else {
    logger.info('Created database');
  }
});


export async function initDatabase() {
  await new Promise((resolve, reject) => {

  });
}

export const test = async function() {
  return await new Promise((resolve, reject) => {
    db.run(`CREATE TABLE TEACHER(
      teacher_id    VARCHAR(50)   PRIMARY KEY NOT NULL,
      teacher_name  NVARCHAR(50)  NOT NULL,
      password      VARCHAR(50)   NOT NULL
    )`, function(err) {
      if (err) {
        reject(err);
      }
      resolve('Created TEACHER Table');
    });
  });
}

async function createTeacherTable() {
  return await new Promise((resolve, reject) => {
    db.run(`CREATE TABLE TEACHER(
      teacher_id    VARCHAR(50)   PRIMARY KEY NOT NULL,
      teacher_name  NVARCHAR(50)  NOT NULL,
      password      VARCHAR(50)   NOT NULL
    )`, function(err) {
      if (err) {
        reject(err);
      }
      resolve('Created TEACHER Table');
    });
  });
}

async function createStudentTable() {
  return await new Promise((resolve, reject) => {
    db.run(`CREATE TABLE STUDENT(
      student_id   VARCHAR(50)  PRIMARY KEY	NOT NULL,
      student_name NVARCHAR(50) NOT NULL,
      sex				   INT	        DEFAULT 0 NOT NULL,
      password     VARCHAR(50)  NOT NULL,
    )`, function(err) {
      if (err) {
        reject(err);
      }
      resolve('Created STUDENT Table');
    });
  });
}

async function createManagerTable() {
  return await new Promise((resolve, reject) => {
    db.run(`CREATE TABLE MANAGER(
      manager_id    VARCHAR(50)   PRIMARY KEY	NOT NULL,
      manager_name	NVARCHAR(50)  NOT NULL,
      password      VARCHAR(50)   NOT NULL
    )`, function(err) {
      if (err) {
        reject(err);
      }
      resolve('Created MANAGER Table');
    });
  });
}

async function createCourseTable() {
  return await new Promise((resolve, reject) => {
    db.run(`CREATE TABLE COURSE(
      course_id     VARCHAR(50)  PRIMARY KEY NOT NULL,
      course_name	  NVARCHAR(50) NOT NULL,
      teacher_id 	  VARCHAR(50)  NOT NULL,
      student_num	  INT	         DEFAULT 0  NOT NULL
    )`, function(err) {
      if (err) {
        reject(err);
      }
      resolve('Created COURSE Table');
    });
  });
}

async function createCourseMemberTable() {
  return await new Promise((resolve, reject) => {
    db.run(`CREATE TABLE COURSE_MEMBER(
      course_id    VARCHAR(50) 	NOT NULL,
      student_id   VARCHAR(50) 	NOT NULL,
      PRIMARY KEY (course_id,student_id)
    )`, function(err) {
      if (err) {
        reject(err);
      }
      resolve('Created COURSE_MEMBER Table');
    });
  });
}


async function createInfoTable() {
  return await new Promise((resolve, reject) => {
    db.run(`CREATE TABLE INFO(
      info_id       VARCHAR(50)   PRIMARY KEY	NOT NULL,
      info_name     NVARCHAR(50)  NOT NULL,
      info_content  NVARCHAR(500) NOT NULL,
      info_user     INT		        DEFAULT 0,
    );`, function(err) {
      if (err) {
        reject(err);
      }
      resolve('Created INFO Table');
    });
  });
}

async function createCourse_Table() {
  return await new Promise((resolve, reject) => {
    db.run(`CREATE TABLE SIGN_USER(
      COURSE_ID  VARCHAR(50)	NOT NULL,
      STUDENT_ID  VARCHAR(50) NOT NULL,
      COURSE_ID   VARCHAR(50) NOT NULL,
      PRIMARY KEY (COURSE_ID,STUDENT_ID)
    );
    `, function(err) {
      if (err) {
        reject(err);
      }
      resolve('Created SIGN_USER Table');
    });
  });
}
async function createCourse_Table() {
  return await new Promise((resolve, reject) => {
    db.run(`CREATE TABLE VOTE(
      VOTE_NAME NVARCHAR(50)  PRIMARY KEY  NOT NULL,
      VOTE_DDL	         DATATIME   NOT NULL,
      MULTISELECT			 INT		DEFAULT 0,
      HOST_ID			VARCHAR(50)		NOT NULL,
      HOST_NAME		NVARCHAR(50)    NOT NULL,
      OPTION_NUM			INT			DEFAULT 1,
      OPTION_MAX			INT			DEFAULT 10,
      VOTE_E1 		VARCHAR(20)		NOT NULL,
      VOTE_N1				INT			DEFAULT 0,
      VOTE_E2 		VARCHAR(20)		NOT NULL,
      VOTE_N2				INT			DEFAULT 0,
      VOTE_E3 		VARCHAR(20)		NOT NULL,
      VOTE_N3				INT			DEFAULT 0,
      VOTE_E4 		VARCHAR(20)		NOT NULL,
      VOTE_N4				INT			DEFAULT 0,
      VOTE_E5 		VARCHAR(20)		NOT NULL,
      VOTE_N5				INT			DEFAULT 0,
      VOTE_E6 		VARCHAR(20)		NOT NULL,
      VOTE_N6				INT			DEFAULT 0,
      VOTE_E7 		VARCHAR(20)		NOT NULL,
      VOTE_N7				INT			DEFAULT 0,
      VOTE_E8 		VARCHAR(20)		NOT NULL,
      VOTE_N8				INT			DEFAULT 0,
      VOTE_E9 		VARCHAR(20)		NOT NULL,
      VOTE_N9				INT			DEFAULT 0,
      VOTE_E10 		VARCHAR(20)		NOT NULL,
      VOTE_N10			INT			DEFAULT 0
    )`, function(err) {
      if (err) {
        reject(err);
      }
      resolve('Created VOTE Table');
    });
  });
}

