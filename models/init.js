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

