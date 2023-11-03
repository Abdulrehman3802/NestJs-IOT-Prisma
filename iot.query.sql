------Setting Sensor fields null--------
ALTER TABLE IF EXISTS "IoT".sensors
    ALTER COLUMN customerid DROP NOT NULL;

ALTER TABLE IF EXISTS "IoT".sensors
    ALTER COLUMN assigned_by DROP NOT NULL;

----------------Organization User--------------------------
CREATE SEQUENCE IF NOT EXISTS "IoT".organizationusers_organizationuserid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE "IoT".organizationusers_organizationuserid_seq
    OWNER TO postgres;
--------------------------------
CREATE TABLE IF NOT EXISTS "IoT".organizationusers
(
    organizationuserid integer NOT NULL DEFAULT nextval('"IoT".organizationusers_organizationuserid_seq'::regclass),
    customerid integer,
    userid integer,
    is_admin boolean,
    CONSTRAINT organizationusers_pkey PRIMARY KEY (organizationuserid),
    CONSTRAINT organizationusers_customerid_fkey FOREIGN KEY (customerid)
        REFERENCES "IoT".customers (customerid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT organizationusers_userid_fkey FOREIGN KEY (userid)
        REFERENCES "IoT".users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-----------------Department User---------------------------

CREATE SEQUENCE IF NOT EXISTS "IoT".departmentusers_departmentuserid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE "IoT".departmentusers_departmentuserid_seq
    OWNER TO postgres;
--------------------------------
CREATE TABLE IF NOT EXISTS "IoT".departmentusers
(
    departmentuserid integer NOT NULL DEFAULT nextval('"IoT".departmentusers_departmentuserid_seq'::regclass),
    departmentid integer,
    userid integer,
    is_admin boolean,
    CONSTRAINT departmentusers_pkey PRIMARY KEY (departmentuserid),
    CONSTRAINT departmentusers_departmentid_fkey FOREIGN KEY (departmentid)
        REFERENCES "IoT".departments (departmentid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT departmentusers_userid_fkey FOREIGN KEY (userid)
        REFERENCES "IoT".users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-----------------Facility User-------------------------------

CREATE SEQUENCE IF NOT EXISTS "IoT".facilityusers_facilityuserid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE "IoT".facilityusers_facilityuserid_seq
    OWNER TO postgres;
----------------------------------------------------
CREATE TABLE IF NOT EXISTS "IoT".facilityusers
(
    facilityuserid integer NOT NULL DEFAULT nextval('"IoT".facilityusers_facilityuserid_seq'::regclass),
    facilityid integer,
    userid integer,
    is_admin boolean,
    CONSTRAINT facilityusers_pkey PRIMARY KEY (facilityuserid),
    CONSTRAINT facilityusers_facilityid_fkey FOREIGN KEY (facilityid)
        REFERENCES "IoT".facilities (facilityid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT facilityusers_userid_fkey FOREIGN KEY (userid)
        REFERENCES "IoT".users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
----------------Add email field in Department ----------------
ALTER TABLE IF EXISTS "IoT".departments
    ADD COLUMN email character varying(100) NOT NULL;