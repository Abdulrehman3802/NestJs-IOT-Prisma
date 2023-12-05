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

--------------------------------------------------------
ALTER TABLE IF EXISTS "IoT".facilities
    ADD COLUMN facility_type character varying(100);

ALTER TABLE IF EXISTS "IoT".facilities
    ADD COLUMN street character varying(100);

ALTER TABLE IF EXISTS "IoT".facilities
    ADD COLUMN city character varying(100);

ALTER TABLE IF EXISTS "IoT".facilities
    ADD COLUMN postcode integer;

ALTER TABLE IF EXISTS "IoT".facilities
        ADD COLUMN site_manager character varying(100);

--------------------------------------------------------

ALTER TABLE IF EXISTS "IoT".customers
        ADD COLUMN street character varying(100);

ALTER TABLE IF EXISTS "IoT".customers
    ADD COLUMN postcode integer;

--------------------------------------------------------
ALTER TABLE IF EXISTS "IoT".departments
        ADD COLUMN description character varying(100);
	
----------------Add organizationdashboard table ----------------
CREATE SEQUENCE IF NOT EXISTS "IoT".organizationdashboard_orgdashboardid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE "IoT".organizationdashboard
(
    orgdashboardid integer NOT NULL DEFAULT nextval('"IoT".organizationdashboard_orgdashboardid_seq'::regclass),
    customerid integer NOT NULL,
    "isCard" boolean,
    PRIMARY KEY (orgdashboardid),
    CONSTRAINT dashboard_customerid_fkey FOREIGN KEY (customerid)
        REFERENCES "IoT".customers (customerid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS "IoT".organizationdashboard
    OWNER to postgres;

----------------Add facilitydashboard table ----------------
CREATE SEQUENCE IF NOT EXISTS "IoT".facilitydashboard_facilitydashboardid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE "IoT".facilitydashboard
(
    facilitydashboardid integer NOT NULL DEFAULT nextval('"IoT".facilitydashboard_facilitydashboardid_seq'::regclass),
	facilityid integer NOT NULL,
    "isCard" boolean,
    PRIMARY KEY (facilitydashboardid),
    CONSTRAINT facilitydashboard_facilityid_fkey FOREIGN KEY (facilityid)
        REFERENCES "IoT".facilities (facilityid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS "IoT".facilitydashboard
    OWNER to postgres;
	
----------------Add department dashboard table ----------------
CREATE SEQUENCE IF NOT EXISTS "IoT".departmentdashboard_departmentdashboardid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE "IoT".departmentdashboard
(
    departmentdashboardid integer NOT NULL DEFAULT nextval('"IoT".departmentdashboard_departmentdashboardid_seq'::regclass),
    departmentid integer NOT NULL,
    "isCard" boolean,
    PRIMARY KEY (departmentdashboardid),
    CONSTRAINT departmentdashboard_departmentid_fkey FOREIGN KEY (departmentid)
        REFERENCES "IoT".departments (departmentid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS "IoT".departmentdashboard
    OWNER to postgres;

----------------Add device dashboard table ----------------
CREATE SEQUENCE IF NOT EXISTS "IoT".devicedashboard_devicedashboardid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE "IoT".devicedashboard
(
    devicedashboardid integer NOT NULL DEFAULT nextval('"IoT".devicedashboard_devicedashboardid_seq'::regclass),
    deviceid integer NOT NULL,
    "isCard" boolean,
    PRIMARY KEY (devicedashboardid),
    CONSTRAINT devicedashboard_deviceid_fkey FOREIGN KEY (deviceid)
        REFERENCES "IoT".devices (deviceid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS "IoT".devicedashboard
    OWNER to postgres;

---------------------------------------------------------
ALTER TABLE IF EXISTS "IoT".facilities DROP COLUMN IF EXISTS location;

ALTER TABLE IF EXISTS "IoT".facilities
    ADD COLUMN longitude integer;

ALTER TABLE IF EXISTS "IoT".facilities
    ADD COLUMN latitude integer;
--------------------------------------------------------------
ALTER TABLE IF EXISTS "IoT".departments DROP COLUMN IF EXISTS location;
----------------Add deviceusers table ----------------
CREATE SEQUENCE IF NOT EXISTS "IoT".deviceusers_deviceuserid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE "IoT".deviceusers
(
    deviceuserid integer NOT NULL DEFAULT nextval('"IoT".deviceusers_deviceuserid_seq'::regclass),
    deviceid integer,
    userid integer,
    is_admin boolean,
    PRIMARY KEY (deviceuserid),
    CONSTRAINT deviceusers_deviceid_fkey FOREIGN KEY (deviceid)
        REFERENCES "IoT".devices (deviceid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT deviceusers_userid_fkey FOREIGN KEY (userid)
        REFERENCES "IoT".users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS "IoT".deviceusers
    OWNER to postgres;

---------------- Add email in devices  ----------------
ALTER TABLE IF EXISTS "IoT".devices
    ADD COLUMN email character varying(100) NOT NULL;

----------------------------------------------------------------
-- 8/11/23 sensorname Added in table
ALTER TABLE IF EXISTS "IoT".sensors
    ADD COLUMN sensorname character varying NOT NULL;

-----------------------Facility------------------------------
-- Add fields for facility
ALTER TABLE IF EXISTS "IoT".facilities
    ADD COLUMN timezone character varying(100);
    ALTER TABLE IF EXISTS "IoT".facilities
        ADD COLUMN currency character varying(100);

----------------SensorType table changes --------------------------------
ALTER TABLE "IoT".sensortypes
    ALTER COLUMN minvalue TYPE integer;

ALTER TABLE "IoT".sensortypes
    ALTER COLUMN maxvalue TYPE integer;

ALTER TABLE IF EXISTS "IoT".sensortypes
    RENAME sensortypename TO property;

ALTER TABLE IF EXISTS "IoT".sensortypes
    RENAME measurementunit TO unit;

ALTER TABLE IF EXISTS "IoT".sensortypes
    ADD COLUMN description character varying(100);

ALTER TABLE IF EXISTS "IoT".sensortypes
    ADD COLUMN name character varying(100);

------------------------- Gateway table changes --------------------------------
    ALTER TABLE IF EXISTS "IoT".gateways
        RENAME gatewayname TO gateway_note;

    ALTER TABLE IF EXISTS "IoT".gateways
        ALTER COLUMN gateway_note DROP NOT NULL;

    ALTER TABLE IF EXISTS "IoT".gateways
        ADD COLUMN gateway_id character varying NOT NULL;

        ALTER TABLE "IoT".gateways
        ADD CONSTRAINT unique_gateway_id UNIQUE (gateway_id);

------------------------- Add NotificationSetup table --------------------------------
CREATE SEQUENCE IF NOT EXISTS "IoT".notificationsetup_notificationsetupid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE "IoT".notificationsetup
(
    notificationsetupid integer NOT NULL DEFAULT nextval('"IoT".notificationsetup_notificationsetupid_seq'::regclass),
    email character varying(100),
    phonenumber character varying(100),
    text_to_speech character varying(100),
    plain_email character varying(100),
    customerid integer NOT NULL,
    userid integer NOT NULL,
    is_email boolean,
    is_phone boolean,
    is_text_to_speech boolean,
    is_plain_email boolean,
    PRIMARY KEY (notificationsetupid),
    CONSTRAINT notificationsetup_customerid_fkey FOREIGN KEY (customerid)
        REFERENCES "IoT".customers (customerid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT notificationsetup_userid_fkey FOREIGN KEY (userid)
        REFERENCES "IoT".users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS "IoT".notificationsetup
    OWNER to postgres;

ALTER TABLE IF EXISTS "IoT".notificationsetup
    ADD COLUMN is_active boolean;

ALTER TABLE IF EXISTS "IoT".notificationsetup
    ADD COLUMN is_deleted boolean;

ALTER TABLE IF EXISTS "IoT".notificationsetup
    ADD COLUMN date_created timestamp with time zone;

ALTER TABLE IF EXISTS "IoT".notificationsetup
    ADD COLUMN date_updated timestamp with time zone;

ALTER TABLE IF EXISTS "IoT".notificationsetup
    ADD COLUMN created_by integer NOT NULL;

ALTER TABLE IF EXISTS "IoT".notificationsetup
    ADD COLUMN updated_by integer NOT NULL;


-------------------------Credit Field Added In Organization-----------------------------------
ALTER TABLE IF EXISTS "IoT".customers
    ADD COLUMN credit integer;

 --------------------- Gateway change -----------------------
 ALTER TABLE IF EXISTS "IoT".gateways
     ADD COLUMN carrier character varying;

------------ Organization change --------------------
ALTER TABLE IF EXISTS "IoT".customers
    ADD COLUMN calibration_date timestamp without time zone;

ALTER TABLE IF EXISTS "IoT".customers
    ADD COLUMN logo character varying;