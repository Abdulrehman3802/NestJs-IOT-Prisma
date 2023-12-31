PGDMP                         {         	   defaultdb    14.10    15.3 �    }           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ~           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16413 	   defaultdb    DATABASE     u   CREATE DATABASE defaultdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE defaultdb;
                avnadmin    false                        2615    16987    IoT    SCHEMA        CREATE SCHEMA "IoT";
    DROP SCHEMA "IoT";
                avnadmin    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            �            1259    16988    alertnotifications    TABLE       CREATE TABLE "IoT".alertnotifications (
    notificationid integer NOT NULL,
    staffid integer NOT NULL,
    deviceid integer NOT NULL,
    thresholdminvalue double precision NOT NULL,
    thresholdmaxvalue double precision NOT NULL,
    notificationtime time without time zone NOT NULL,
    lastacknowledgmenttime timestamp with time zone,
    escalationlevel integer NOT NULL
);
 %   DROP TABLE "IoT".alertnotifications;
       IoT         heap    avnadmin    false    6            �            1259    16991 %   alertnotifications_notificationid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".alertnotifications_notificationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE "IoT".alertnotifications_notificationid_seq;
       IoT          avnadmin    false    210    6            �           0    0 %   alertnotifications_notificationid_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE "IoT".alertnotifications_notificationid_seq OWNED BY "IoT".alertnotifications.notificationid;
          IoT          avnadmin    false    211            �            1259    16992    alerts_alertid_seq    SEQUENCE     z   CREATE SEQUENCE "IoT".alerts_alertid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE "IoT".alerts_alertid_seq;
       IoT          avnadmin    false    6            �            1259    16993    alerts    TABLE     m  CREATE TABLE "IoT".alerts (
    alertid integer DEFAULT nextval('"IoT".alerts_alertid_seq'::regclass) NOT NULL,
    sensorid integer NOT NULL,
    alerttype character varying(50) NOT NULL,
    readingvalue numeric(10,2) NOT NULL,
    "timestamp" timestamp without time zone,
    acknowledgedby integer,
    escalatedto integer,
    isgatewayfailurealert boolean
);
    DROP TABLE "IoT".alerts;
       IoT         heap    avnadmin    false    212    6            �            1259    16997    alertstatus_alertid_seq    SEQUENCE        CREATE SEQUENCE "IoT".alertstatus_alertid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE "IoT".alertstatus_alertid_seq;
       IoT          avnadmin    false    6            �            1259    16998    alertstatus    TABLE     �   CREATE TABLE "IoT".alertstatus (
    alertid integer DEFAULT nextval('"IoT".alertstatus_alertid_seq'::regclass) NOT NULL,
    status character varying(50),
    statustimestamp timestamp without time zone
);
    DROP TABLE "IoT".alertstatus;
       IoT         heap    avnadmin    false    214    6            �            1259    17002 	   customers    TABLE     N  CREATE TABLE "IoT".customers (
    customerid integer NOT NULL,
    customername character varying(100) NOT NULL,
    contactperson character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    address character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    date_updated timestamp without time zone DEFAULT now(),
    is_deleted boolean DEFAULT false,
    created_by integer NOT NULL,
    updated_by integer NOT NULL,
    street character varying(100),
    postcode integer,
    credit integer,
    calibration_date timestamp without time zone,
    logo character varying,
    interval1 integer,
    interval2 integer,
    interval3 integer,
    interval4 integer
);
    DROP TABLE "IoT".customers;
       IoT         heap    avnadmin    false    6            �            1259    17011    customers_customerid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".customers_customerid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE "IoT".customers_customerid_seq;
       IoT          avnadmin    false    6    216            �           0    0    customers_customerid_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE "IoT".customers_customerid_seq OWNED BY "IoT".customers.customerid;
          IoT          avnadmin    false    217            �            1259    17012 -   departmentdashboard_departmentdashboardid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".departmentdashboard_departmentdashboardid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 C   DROP SEQUENCE "IoT".departmentdashboard_departmentdashboardid_seq;
       IoT          avnadmin    false    6            �            1259    17013    departmentdashboard    TABLE     �   CREATE TABLE "IoT".departmentdashboard (
    departmentdashboardid integer DEFAULT nextval('"IoT".departmentdashboard_departmentdashboardid_seq'::regclass) NOT NULL,
    departmentid integer NOT NULL,
    "isCard" boolean
);
 &   DROP TABLE "IoT".departmentdashboard;
       IoT         heap    avnadmin    false    218    6            �            1259    17017    departments    TABLE       CREATE TABLE "IoT".departments (
    departmentid integer NOT NULL,
    departmentname character varying(100) NOT NULL,
    customerid integer NOT NULL,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now() NOT NULL,
    date_updated timestamp without time zone DEFAULT now(),
    is_deleted boolean DEFAULT false,
    facilityid integer NOT NULL,
    created_by integer NOT NULL,
    updated_by integer NOT NULL,
    email character varying(100) NOT NULL,
    description character varying(100)
);
    DROP TABLE "IoT".departments;
       IoT         heap    avnadmin    false    6            �            1259    17024    departments_departmentid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".departments_departmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE "IoT".departments_departmentid_seq;
       IoT          avnadmin    false    6    220            �           0    0    departments_departmentid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE "IoT".departments_departmentid_seq OWNED BY "IoT".departments.departmentid;
          IoT          avnadmin    false    221            �            1259    17025 $   departmentusers_departmentuserid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".departmentusers_departmentuserid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE "IoT".departmentusers_departmentuserid_seq;
       IoT          avnadmin    false    6            �            1259    17026    departmentusers    TABLE     �   CREATE TABLE "IoT".departmentusers (
    departmentuserid integer DEFAULT nextval('"IoT".departmentusers_departmentuserid_seq'::regclass) NOT NULL,
    departmentid integer,
    userid integer,
    is_admin boolean
);
 "   DROP TABLE "IoT".departmentusers;
       IoT         heap    avnadmin    false    222    6            �            1259    17030 %   devicedashboard_devicedashboardid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".devicedashboard_devicedashboardid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE "IoT".devicedashboard_devicedashboardid_seq;
       IoT          avnadmin    false    6            �            1259    17031    devicedashboard    TABLE     �   CREATE TABLE "IoT".devicedashboard (
    devicedashboardid integer DEFAULT nextval('"IoT".devicedashboard_devicedashboardid_seq'::regclass) NOT NULL,
    deviceid integer NOT NULL,
    "isCard" boolean
);
 "   DROP TABLE "IoT".devicedashboard;
       IoT         heap    avnadmin    false    224    6            �            1259    17035    devices    TABLE     Z  CREATE TABLE "IoT".devices (
    deviceid integer NOT NULL,
    devicename character varying(100) NOT NULL,
    departmentid integer NOT NULL,
    devicetype character varying(50),
    manufacturer character varying(100),
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now() NOT NULL,
    date_updated timestamp without time zone DEFAULT now(),
    is_deleted boolean DEFAULT false,
    facilityid integer NOT NULL,
    customerid integer NOT NULL,
    created_by integer NOT NULL,
    updated_by integer NOT NULL,
    email character varying(100) NOT NULL
);
    DROP TABLE "IoT".devices;
       IoT         heap    avnadmin    false    6            �            1259    17042    devices_deviceid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".devices_deviceid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE "IoT".devices_deviceid_seq;
       IoT          avnadmin    false    226    6            �           0    0    devices_deviceid_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE "IoT".devices_deviceid_seq OWNED BY "IoT".devices.deviceid;
          IoT          avnadmin    false    227            �            1259    17043    deviceusers_deviceuserid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".deviceusers_deviceuserid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE "IoT".deviceusers_deviceuserid_seq;
       IoT          avnadmin    false    6            �            1259    17044    deviceusers    TABLE     �   CREATE TABLE "IoT".deviceusers (
    deviceuserid integer DEFAULT nextval('"IoT".deviceusers_deviceuserid_seq'::regclass) NOT NULL,
    deviceid integer,
    userid integer,
    is_admin boolean
);
    DROP TABLE "IoT".deviceusers;
       IoT         heap    avnadmin    false    228    6            �            1259    17048    escalationlevels    TABLE     �   CREATE TABLE "IoT".escalationlevels (
    levelid integer NOT NULL,
    levelname character varying(50),
    description text
);
 #   DROP TABLE "IoT".escalationlevels;
       IoT         heap    avnadmin    false    6            �            1259    17053    escalationlevels_levelid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".escalationlevels_levelid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE "IoT".escalationlevels_levelid_seq;
       IoT          avnadmin    false    230    6            �           0    0    escalationlevels_levelid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE "IoT".escalationlevels_levelid_seq OWNED BY "IoT".escalationlevels.levelid;
          IoT          avnadmin    false    231            �            1259    17054    escalationstatus_alertid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".escalationstatus_alertid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE "IoT".escalationstatus_alertid_seq;
       IoT          avnadmin    false    6            �            1259    17055    escalationstatus    TABLE     �   CREATE TABLE "IoT".escalationstatus (
    alertid integer DEFAULT nextval('"IoT".escalationstatus_alertid_seq'::regclass) NOT NULL,
    levelid integer,
    staffid integer,
    lastescalationtimestamp timestamp without time zone
);
 #   DROP TABLE "IoT".escalationstatus;
       IoT         heap    avnadmin    false    232    6            �            1259    17059    facilities_facilityid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".facilities_facilityid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE "IoT".facilities_facilityid_seq;
       IoT          avnadmin    false    6            �            1259    17060 
   facilities    TABLE     �  CREATE TABLE "IoT".facilities (
    facilityid integer DEFAULT nextval('"IoT".facilities_facilityid_seq'::regclass) NOT NULL,
    name character varying(255),
    address character varying(255),
    contactname character varying(255),
    contactphonenumber character varying(255),
    email character varying(255),
    isfacilityadmin boolean,
    is_active boolean DEFAULT true,
    is_deleted boolean DEFAULT false,
    date_created timestamp with time zone DEFAULT now(),
    date_updated timestamp with time zone DEFAULT now(),
    customerid integer,
    created_by integer NOT NULL,
    updated_by integer NOT NULL,
    longitude integer,
    latitude integer,
    facility_type character varying(100),
    street character varying(100),
    city character varying(100),
    postcode integer,
    site_manager character varying(100),
    timezone character varying(100),
    currency character varying(100)
);
    DROP TABLE "IoT".facilities;
       IoT         heap    avnadmin    false    234    6            �            1259    17070 )   facilitydashboard_facilitydashboardid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".facilitydashboard_facilitydashboardid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE "IoT".facilitydashboard_facilitydashboardid_seq;
       IoT          avnadmin    false    6            �            1259    17071    facilitydashboard    TABLE     �   CREATE TABLE "IoT".facilitydashboard (
    facilitydashboardid integer DEFAULT nextval('"IoT".facilitydashboard_facilitydashboardid_seq'::regclass) NOT NULL,
    facilityid integer NOT NULL,
    "isCard" boolean
);
 $   DROP TABLE "IoT".facilitydashboard;
       IoT         heap    avnadmin    false    236    6            �            1259    17075     facilityusers_facilityuserid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".facilityusers_facilityuserid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE "IoT".facilityusers_facilityuserid_seq;
       IoT          avnadmin    false    6            �            1259    17076    facilityusers    TABLE     �   CREATE TABLE "IoT".facilityusers (
    facilityuserid integer DEFAULT nextval('"IoT".facilityusers_facilityuserid_seq'::regclass) NOT NULL,
    facilityid integer,
    userid integer,
    is_admin boolean
);
     DROP TABLE "IoT".facilityusers;
       IoT         heap    avnadmin    false    238    6            �            1259    17080    gatewayfailures    TABLE     �   CREATE TABLE "IoT".gatewayfailures (
    failureid integer NOT NULL,
    gatewayid integer,
    failuretimestamp timestamp without time zone,
    recoverytimestamp timestamp without time zone
);
 "   DROP TABLE "IoT".gatewayfailures;
       IoT         heap    avnadmin    false    6            �            1259    17083    gatewayfailures_failureid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".gatewayfailures_failureid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE "IoT".gatewayfailures_failureid_seq;
       IoT          avnadmin    false    6    240            �           0    0    gatewayfailures_failureid_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE "IoT".gatewayfailures_failureid_seq OWNED BY "IoT".gatewayfailures.failureid;
          IoT          avnadmin    false    241            �            1259    17084    gateways    TABLE     �  CREATE TABLE "IoT".gateways (
    gatewayid integer NOT NULL,
    gateway_note character varying(100),
    location character varying(255),
    customerid integer NOT NULL,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone NOT NULL,
    date_updated timestamp without time zone,
    is_deleted boolean DEFAULT false,
    created_by integer NOT NULL,
    updated_by integer NOT NULL,
    gateway_id character varying NOT NULL,
    carrier character varying
);
    DROP TABLE "IoT".gateways;
       IoT         heap    avnadmin    false    6            �            1259    17091    gateways_gatewayid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".gateways_gatewayid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE "IoT".gateways_gatewayid_seq;
       IoT          avnadmin    false    6    242            �           0    0    gateways_gatewayid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE "IoT".gateways_gatewayid_seq OWNED BY "IoT".gateways.gatewayid;
          IoT          avnadmin    false    243            �            1259    17092 )   notificationsetup_notificationsetupid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".notificationsetup_notificationsetupid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE "IoT".notificationsetup_notificationsetupid_seq;
       IoT          avnadmin    false    6            �            1259    17093    notificationsetup    TABLE     �  CREATE TABLE "IoT".notificationsetup (
    notificationsetupid integer DEFAULT nextval('"IoT".notificationsetup_notificationsetupid_seq'::regclass) NOT NULL,
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
    is_active boolean,
    is_deleted boolean,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    created_by integer NOT NULL,
    updated_by integer NOT NULL
);
 $   DROP TABLE "IoT".notificationsetup;
       IoT         heap    avnadmin    false    244    6            �            1259    17097 (   organizationdashboard_orgdashboardid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".organizationdashboard_orgdashboardid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE "IoT".organizationdashboard_orgdashboardid_seq;
       IoT          avnadmin    false    6            �            1259    17098    organizationdashboard    TABLE     �   CREATE TABLE "IoT".organizationdashboard (
    orgdashboardid integer DEFAULT nextval('"IoT".organizationdashboard_orgdashboardid_seq'::regclass) NOT NULL,
    customerid integer NOT NULL,
    "isCard" boolean
);
 (   DROP TABLE "IoT".organizationdashboard;
       IoT         heap    avnadmin    false    246    6            �            1259    17102 (   organizationusers_organizationuserid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".organizationusers_organizationuserid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE "IoT".organizationusers_organizationuserid_seq;
       IoT          avnadmin    false    6            �            1259    17103    organizationusers    TABLE     �   CREATE TABLE "IoT".organizationusers (
    organizationuserid integer DEFAULT nextval('"IoT".organizationusers_organizationuserid_seq'::regclass) NOT NULL,
    customerid integer,
    userid integer,
    is_admin boolean
);
 $   DROP TABLE "IoT".organizationusers;
       IoT         heap    avnadmin    false    248    6            �            1259    17107    readings    TABLE     E  CREATE TABLE "IoT".readings (
    readingid integer NOT NULL,
    sensorid integer,
    deviceid integer,
    gatewayid integer,
    measure character varying(100),
    aws_id character varying(100),
    location character varying(100),
    sensorvalue character varying(100),
    reading_timestamp character varying(100)
);
    DROP TABLE "IoT".readings;
       IoT         heap    avnadmin    false    6            �            1259    17112    readings_readingid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".readings_readingid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE "IoT".readings_readingid_seq;
       IoT          avnadmin    false    6    250            �           0    0    readings_readingid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE "IoT".readings_readingid_seq OWNED BY "IoT".readings.readingid;
          IoT          avnadmin    false    251            �            1259    17113 $   rolepermissions_rolepermissionid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".rolepermissions_rolepermissionid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE "IoT".rolepermissions_rolepermissionid_seq;
       IoT          avnadmin    false    6            �            1259    17114    rolepermissions    TABLE       CREATE TABLE "IoT".rolepermissions (
    rolepermissionid integer DEFAULT nextval('"IoT".rolepermissions_rolepermissionid_seq'::regclass) NOT NULL,
    roleid integer,
    permissiontype character varying(255),
    permissionvalue character varying(255)
);
 "   DROP TABLE "IoT".rolepermissions;
       IoT         heap    avnadmin    false    252    6            �            1259    17120    roles_roleid_seq    SEQUENCE     x   CREATE SEQUENCE "IoT".roles_roleid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE "IoT".roles_roleid_seq;
       IoT          avnadmin    false    6            �            1259    17121    roles    TABLE       CREATE TABLE "IoT".roles (
    roleid integer DEFAULT nextval('"IoT".roles_roleid_seq'::regclass) NOT NULL,
    name character varying(255),
    normalizedname character varying(255),
    is_active boolean DEFAULT true,
    is_deleted boolean DEFAULT false
);
    DROP TABLE "IoT".roles;
       IoT         heap    avnadmin    false    254    6                        1259    17129    sensors    TABLE     �  CREATE TABLE "IoT".sensors (
    sensorid integer NOT NULL,
    deviceid integer,
    is_active boolean DEFAULT true,
    customerid integer,
    is_deleted boolean DEFAULT false,
    aws_sensorid character varying(50) NOT NULL,
    date_created timestamp without time zone DEFAULT now(),
    date_updated timestamp without time zone DEFAULT now(),
    assigned_by integer,
    sensorname character varying
);
    DROP TABLE "IoT".sensors;
       IoT         heap    avnadmin    false    6                       1259    17138    sensors_sensorid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".sensors_sensorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE "IoT".sensors_sensorid_seq;
       IoT          avnadmin    false    6    256            �           0    0    sensors_sensorid_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE "IoT".sensors_sensorid_seq OWNED BY "IoT".sensors.sensorid;
          IoT          avnadmin    false    257                       1259    17140    sensorgatewayassignment    TABLE     �   CREATE TABLE "IoT".sensorgatewayassignment (
    sensorid integer DEFAULT nextval('"IoT".sensors_sensorid_seq'::regclass) NOT NULL,
    gatewayid integer NOT NULL
);
 *   DROP TABLE "IoT".sensorgatewayassignment;
       IoT         heap    avnadmin    false    257    6                       1259    17144 $   sensorgatewayassignment_sensorid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".sensorgatewayassignment_sensorid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE "IoT".sensorgatewayassignment_sensorid_seq;
       IoT          avnadmin    false    6                       1259    17145    sensortypes    TABLE     4  CREATE TABLE "IoT".sensortypes (
    sensortypeid integer NOT NULL,
    property character varying(255),
    unit character varying(50),
    minvalue integer,
    maxvalue integer,
    sensorid integer NOT NULL,
    aws_sensorid character varying(50) NOT NULL,
    is_hidden boolean DEFAULT false,
    is_deleted boolean DEFAULT false,
    date_created timestamp without time zone DEFAULT now(),
    date_updated timestamp without time zone DEFAULT now(),
    updated_by integer NOT NULL,
    description character varying(100),
    name character varying(100)
);
    DROP TABLE "IoT".sensortypes;
       IoT         heap    avnadmin    false    6                       1259    17154    sensortypes_sensortypeid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".sensortypes_sensortypeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE "IoT".sensortypes_sensortypeid_seq;
       IoT          avnadmin    false    6    260            �           0    0    sensortypes_sensortypeid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE "IoT".sensortypes_sensortypeid_seq OWNED BY "IoT".sensortypes.sensortypeid;
          IoT          avnadmin    false    261                       1259    17155    staff    TABLE     �  CREATE TABLE "IoT".staff (
    staffid integer NOT NULL,
    deviceid integer,
    name character varying(100) NOT NULL,
    email character varying(100),
    phone character varying(20),
    pager character varying(20),
    departmentid integer NOT NULL,
    isdepartmenthead boolean DEFAULT false,
    is_active boolean DEFAULT true,
    notificationstarttime time without time zone,
    notificationendtime time without time zone,
    weekdaysonly boolean DEFAULT false,
    date_created timestamp without time zone DEFAULT now() NOT NULL,
    date_updated timestamp without time zone DEFAULT now(),
    created_by integer NOT NULL,
    updated_by integer NOT NULL,
    is_deleted boolean DEFAULT false
);
    DROP TABLE "IoT".staff;
       IoT         heap    avnadmin    false    6                       1259    17164    staff_staffid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".staff_staffid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE "IoT".staff_staffid_seq;
       IoT          avnadmin    false    262    6            �           0    0    staff_staffid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE "IoT".staff_staffid_seq OWNED BY "IoT".staff.staffid;
          IoT          avnadmin    false    263                       1259    17165    staffdeviceassignment    TABLE     {   CREATE TABLE "IoT".staffdeviceassignment (
    assignmentid integer NOT NULL,
    staffid integer,
    deviceid integer
);
 (   DROP TABLE "IoT".staffdeviceassignment;
       IoT         heap    avnadmin    false    6            	           1259    17168 &   staffdeviceassignment_assignmentid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".staffdeviceassignment_assignmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE "IoT".staffdeviceassignment_assignmentid_seq;
       IoT          avnadmin    false    264    6            �           0    0 &   staffdeviceassignment_assignmentid_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE "IoT".staffdeviceassignment_assignmentid_seq OWNED BY "IoT".staffdeviceassignment.assignmentid;
          IoT          avnadmin    false    265            
           1259    17169    userroles_userroleid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".userroles_userroleid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE "IoT".userroles_userroleid_seq;
       IoT          avnadmin    false    6                       1259    17170 	   userroles    TABLE     �   CREATE TABLE "IoT".userroles (
    userroleid integer DEFAULT nextval('"IoT".userroles_userroleid_seq'::regclass) NOT NULL,
    roleid integer NOT NULL,
    userid integer NOT NULL
);
    DROP TABLE "IoT".userroles;
       IoT         heap    avnadmin    false    266    6                       1259    17174    users_userid_seq    SEQUENCE     x   CREATE SEQUENCE "IoT".users_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE "IoT".users_userid_seq;
       IoT          avnadmin    false    6                       1259    17175    users    TABLE     `  CREATE TABLE "IoT".users (
    userid integer DEFAULT nextval('"IoT".users_userid_seq'::regclass) NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    email character varying(255),
    address character varying(255),
    passwordhash character varying(255),
    phonenumber character varying(20),
    createdby integer,
    updatedby integer,
    is_active boolean DEFAULT true,
    is_deleted boolean DEFAULT false,
    date_created timestamp with time zone DEFAULT now(),
    date_updated timestamp with time zone DEFAULT now(),
    resettoken character varying(255)
);
    DROP TABLE "IoT".users;
       IoT         heap    avnadmin    false    268    6            �           2604    17185 !   alertnotifications notificationid    DEFAULT     �   ALTER TABLE ONLY "IoT".alertnotifications ALTER COLUMN notificationid SET DEFAULT nextval('"IoT".alertnotifications_notificationid_seq'::regclass);
 O   ALTER TABLE "IoT".alertnotifications ALTER COLUMN notificationid DROP DEFAULT;
       IoT          avnadmin    false    211    210            �           2604    17186    customers customerid    DEFAULT     z   ALTER TABLE ONLY "IoT".customers ALTER COLUMN customerid SET DEFAULT nextval('"IoT".customers_customerid_seq'::regclass);
 B   ALTER TABLE "IoT".customers ALTER COLUMN customerid DROP DEFAULT;
       IoT          avnadmin    false    217    216                        2604    17187    departments departmentid    DEFAULT     �   ALTER TABLE ONLY "IoT".departments ALTER COLUMN departmentid SET DEFAULT nextval('"IoT".departments_departmentid_seq'::regclass);
 F   ALTER TABLE "IoT".departments ALTER COLUMN departmentid DROP DEFAULT;
       IoT          avnadmin    false    221    220                       2604    17188    devices deviceid    DEFAULT     r   ALTER TABLE ONLY "IoT".devices ALTER COLUMN deviceid SET DEFAULT nextval('"IoT".devices_deviceid_seq'::regclass);
 >   ALTER TABLE "IoT".devices ALTER COLUMN deviceid DROP DEFAULT;
       IoT          avnadmin    false    227    226                       2604    17189    escalationlevels levelid    DEFAULT     �   ALTER TABLE ONLY "IoT".escalationlevels ALTER COLUMN levelid SET DEFAULT nextval('"IoT".escalationlevels_levelid_seq'::regclass);
 F   ALTER TABLE "IoT".escalationlevels ALTER COLUMN levelid DROP DEFAULT;
       IoT          avnadmin    false    231    230                       2604    17190    gatewayfailures failureid    DEFAULT     �   ALTER TABLE ONLY "IoT".gatewayfailures ALTER COLUMN failureid SET DEFAULT nextval('"IoT".gatewayfailures_failureid_seq'::regclass);
 G   ALTER TABLE "IoT".gatewayfailures ALTER COLUMN failureid DROP DEFAULT;
       IoT          avnadmin    false    241    240                       2604    17191    gateways gatewayid    DEFAULT     v   ALTER TABLE ONLY "IoT".gateways ALTER COLUMN gatewayid SET DEFAULT nextval('"IoT".gateways_gatewayid_seq'::regclass);
 @   ALTER TABLE "IoT".gateways ALTER COLUMN gatewayid DROP DEFAULT;
       IoT          avnadmin    false    243    242                       2604    17192    readings readingid    DEFAULT     v   ALTER TABLE ONLY "IoT".readings ALTER COLUMN readingid SET DEFAULT nextval('"IoT".readings_readingid_seq'::regclass);
 @   ALTER TABLE "IoT".readings ALTER COLUMN readingid DROP DEFAULT;
       IoT          avnadmin    false    251    250            "           2604    17193    sensors sensorid    DEFAULT     r   ALTER TABLE ONLY "IoT".sensors ALTER COLUMN sensorid SET DEFAULT nextval('"IoT".sensors_sensorid_seq'::regclass);
 >   ALTER TABLE "IoT".sensors ALTER COLUMN sensorid DROP DEFAULT;
       IoT          avnadmin    false    257    256            (           2604    17194    sensortypes sensortypeid    DEFAULT     �   ALTER TABLE ONLY "IoT".sensortypes ALTER COLUMN sensortypeid SET DEFAULT nextval('"IoT".sensortypes_sensortypeid_seq'::regclass);
 F   ALTER TABLE "IoT".sensortypes ALTER COLUMN sensortypeid DROP DEFAULT;
       IoT          avnadmin    false    261    260            -           2604    17195    staff staffid    DEFAULT     l   ALTER TABLE ONLY "IoT".staff ALTER COLUMN staffid SET DEFAULT nextval('"IoT".staff_staffid_seq'::regclass);
 ;   ALTER TABLE "IoT".staff ALTER COLUMN staffid DROP DEFAULT;
       IoT          avnadmin    false    263    262            4           2604    17196 "   staffdeviceassignment assignmentid    DEFAULT     �   ALTER TABLE ONLY "IoT".staffdeviceassignment ALTER COLUMN assignmentid SET DEFAULT nextval('"IoT".staffdeviceassignment_assignmentid_seq'::regclass);
 P   ALTER TABLE "IoT".staffdeviceassignment ALTER COLUMN assignmentid DROP DEFAULT;
       IoT          avnadmin    false    265    264            ?          0    16988    alertnotifications 
   TABLE DATA           �   COPY "IoT".alertnotifications (notificationid, staffid, deviceid, thresholdminvalue, thresholdmaxvalue, notificationtime, lastacknowledgmenttime, escalationlevel) FROM stdin;
    IoT          avnadmin    false    210   �N      B          0    16993    alerts 
   TABLE DATA           �   COPY "IoT".alerts (alertid, sensorid, alerttype, readingvalue, "timestamp", acknowledgedby, escalatedto, isgatewayfailurealert) FROM stdin;
    IoT          avnadmin    false    213   �N      D          0    16998    alertstatus 
   TABLE DATA           F   COPY "IoT".alertstatus (alertid, status, statustimestamp) FROM stdin;
    IoT          avnadmin    false    215   �N      E          0    17002 	   customers 
   TABLE DATA             COPY "IoT".customers (customerid, customername, contactperson, email, phone, address, city, is_active, date_created, date_updated, is_deleted, created_by, updated_by, street, postcode, credit, calibration_date, logo, interval1, interval2, interval3, interval4) FROM stdin;
    IoT          avnadmin    false    216   �N      H          0    17013    departmentdashboard 
   TABLE DATA           [   COPY "IoT".departmentdashboard (departmentdashboardid, departmentid, "isCard") FROM stdin;
    IoT          avnadmin    false    219   �P      I          0    17017    departments 
   TABLE DATA           �   COPY "IoT".departments (departmentid, departmentname, customerid, is_active, date_created, date_updated, is_deleted, facilityid, created_by, updated_by, email, description) FROM stdin;
    IoT          avnadmin    false    220   �P      L          0    17026    departmentusers 
   TABLE DATA           Z   COPY "IoT".departmentusers (departmentuserid, departmentid, userid, is_admin) FROM stdin;
    IoT          avnadmin    false    223   "R      N          0    17031    devicedashboard 
   TABLE DATA           O   COPY "IoT".devicedashboard (devicedashboardid, deviceid, "isCard") FROM stdin;
    IoT          avnadmin    false    225   UR      O          0    17035    devices 
   TABLE DATA           �   COPY "IoT".devices (deviceid, devicename, departmentid, devicetype, manufacturer, is_active, date_created, date_updated, is_deleted, facilityid, customerid, created_by, updated_by, email) FROM stdin;
    IoT          avnadmin    false    226   rR      R          0    17044    deviceusers 
   TABLE DATA           N   COPY "IoT".deviceusers (deviceuserid, deviceid, userid, is_admin) FROM stdin;
    IoT          avnadmin    false    229   �S      S          0    17048    escalationlevels 
   TABLE DATA           J   COPY "IoT".escalationlevels (levelid, levelname, description) FROM stdin;
    IoT          avnadmin    false    230   +T      V          0    17055    escalationstatus 
   TABLE DATA           ]   COPY "IoT".escalationstatus (alertid, levelid, staffid, lastescalationtimestamp) FROM stdin;
    IoT          avnadmin    false    233   HT      X          0    17060 
   facilities 
   TABLE DATA           ,  COPY "IoT".facilities (facilityid, name, address, contactname, contactphonenumber, email, isfacilityadmin, is_active, is_deleted, date_created, date_updated, customerid, created_by, updated_by, longitude, latitude, facility_type, street, city, postcode, site_manager, timezone, currency) FROM stdin;
    IoT          avnadmin    false    235   eT      Z          0    17071    facilitydashboard 
   TABLE DATA           U   COPY "IoT".facilitydashboard (facilitydashboardid, facilityid, "isCard") FROM stdin;
    IoT          avnadmin    false    237   V      \          0    17076    facilityusers 
   TABLE DATA           T   COPY "IoT".facilityusers (facilityuserid, facilityid, userid, is_admin) FROM stdin;
    IoT          avnadmin    false    239   =V      ]          0    17080    gatewayfailures 
   TABLE DATA           c   COPY "IoT".gatewayfailures (failureid, gatewayid, failuretimestamp, recoverytimestamp) FROM stdin;
    IoT          avnadmin    false    240   oV      _          0    17084    gateways 
   TABLE DATA           �   COPY "IoT".gateways (gatewayid, gateway_note, location, customerid, is_active, date_created, date_updated, is_deleted, created_by, updated_by, gateway_id, carrier) FROM stdin;
    IoT          avnadmin    false    242   �V      b          0    17093    notificationsetup 
   TABLE DATA             COPY "IoT".notificationsetup (notificationsetupid, email, phonenumber, text_to_speech, plain_email, customerid, userid, is_email, is_phone, is_text_to_speech, is_plain_email, is_active, is_deleted, date_created, date_updated, created_by, updated_by) FROM stdin;
    IoT          avnadmin    false    245   �V      d          0    17098    organizationdashboard 
   TABLE DATA           T   COPY "IoT".organizationdashboard (orgdashboardid, customerid, "isCard") FROM stdin;
    IoT          avnadmin    false    247   +W      f          0    17103    organizationusers 
   TABLE DATA           \   COPY "IoT".organizationusers (organizationuserid, customerid, userid, is_admin) FROM stdin;
    IoT          avnadmin    false    249   eW      g          0    17107    readings 
   TABLE DATA           �   COPY "IoT".readings (readingid, sensorid, deviceid, gatewayid, measure, aws_id, location, sensorvalue, reading_timestamp) FROM stdin;
    IoT          avnadmin    false    250   �W      j          0    17114    rolepermissions 
   TABLE DATA           c   COPY "IoT".rolepermissions (rolepermissionid, roleid, permissiontype, permissionvalue) FROM stdin;
    IoT          avnadmin    false    253   ��      l          0    17121    roles 
   TABLE DATA           S   COPY "IoT".roles (roleid, name, normalizedname, is_active, is_deleted) FROM stdin;
    IoT          avnadmin    false    255   ��      o          0    17140    sensorgatewayassignment 
   TABLE DATA           E   COPY "IoT".sensorgatewayassignment (sensorid, gatewayid) FROM stdin;
    IoT          avnadmin    false    258   z�      m          0    17129    sensors 
   TABLE DATA           �   COPY "IoT".sensors (sensorid, deviceid, is_active, customerid, is_deleted, aws_sensorid, date_created, date_updated, assigned_by, sensorname) FROM stdin;
    IoT          avnadmin    false    256   ��      q          0    17145    sensortypes 
   TABLE DATA           �   COPY "IoT".sensortypes (sensortypeid, property, unit, minvalue, maxvalue, sensorid, aws_sensorid, is_hidden, is_deleted, date_created, date_updated, updated_by, description, name) FROM stdin;
    IoT          avnadmin    false    260   |�      s          0    17155    staff 
   TABLE DATA           �   COPY "IoT".staff (staffid, deviceid, name, email, phone, pager, departmentid, isdepartmenthead, is_active, notificationstarttime, notificationendtime, weekdaysonly, date_created, date_updated, created_by, updated_by, is_deleted) FROM stdin;
    IoT          avnadmin    false    262   �      u          0    17165    staffdeviceassignment 
   TABLE DATA           O   COPY "IoT".staffdeviceassignment (assignmentid, staffid, deviceid) FROM stdin;
    IoT          avnadmin    false    264   )�      x          0    17170 	   userroles 
   TABLE DATA           >   COPY "IoT".userroles (userroleid, roleid, userid) FROM stdin;
    IoT          avnadmin    false    267   F�      z          0    17175    users 
   TABLE DATA           �   COPY "IoT".users (userid, firstname, lastname, email, address, passwordhash, phonenumber, createdby, updatedby, is_active, is_deleted, date_created, date_updated, resettoken) FROM stdin;
    IoT          avnadmin    false    269   ��      �           0    0 %   alertnotifications_notificationid_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('"IoT".alertnotifications_notificationid_seq', 1, false);
          IoT          avnadmin    false    211            �           0    0    alerts_alertid_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('"IoT".alerts_alertid_seq', 1, false);
          IoT          avnadmin    false    212            �           0    0    alertstatus_alertid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('"IoT".alertstatus_alertid_seq', 1, false);
          IoT          avnadmin    false    214            �           0    0    customers_customerid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('"IoT".customers_customerid_seq', 8, true);
          IoT          avnadmin    false    217            �           0    0 -   departmentdashboard_departmentdashboardid_seq    SEQUENCE SET     Z   SELECT pg_catalog.setval('"IoT".departmentdashboard_departmentdashboardid_seq', 2, true);
          IoT          avnadmin    false    218            �           0    0    departments_departmentid_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('"IoT".departments_departmentid_seq', 9, true);
          IoT          avnadmin    false    221            �           0    0 $   departmentusers_departmentuserid_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('"IoT".departmentusers_departmentuserid_seq', 7, true);
          IoT          avnadmin    false    222            �           0    0 %   devicedashboard_devicedashboardid_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('"IoT".devicedashboard_devicedashboardid_seq', 1, false);
          IoT          avnadmin    false    224            �           0    0    devices_deviceid_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('"IoT".devices_deviceid_seq', 10, true);
          IoT          avnadmin    false    227            �           0    0    deviceusers_deviceuserid_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('"IoT".deviceusers_deviceuserid_seq', 7, true);
          IoT          avnadmin    false    228            �           0    0    escalationlevels_levelid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('"IoT".escalationlevels_levelid_seq', 1, false);
          IoT          avnadmin    false    231            �           0    0    escalationstatus_alertid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('"IoT".escalationstatus_alertid_seq', 1, false);
          IoT          avnadmin    false    232            �           0    0    facilities_facilityid_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('"IoT".facilities_facilityid_seq', 6, true);
          IoT          avnadmin    false    234            �           0    0 )   facilitydashboard_facilitydashboardid_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('"IoT".facilitydashboard_facilitydashboardid_seq', 2, true);
          IoT          avnadmin    false    236            �           0    0     facilityusers_facilityuserid_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('"IoT".facilityusers_facilityuserid_seq', 7, true);
          IoT          avnadmin    false    238            �           0    0    gatewayfailures_failureid_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('"IoT".gatewayfailures_failureid_seq', 1, false);
          IoT          avnadmin    false    241            �           0    0    gateways_gatewayid_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('"IoT".gateways_gatewayid_seq', 1, false);
          IoT          avnadmin    false    243            �           0    0 )   notificationsetup_notificationsetupid_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('"IoT".notificationsetup_notificationsetupid_seq', 6, true);
          IoT          avnadmin    false    244            �           0    0 (   organizationdashboard_orgdashboardid_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('"IoT".organizationdashboard_orgdashboardid_seq', 6, true);
          IoT          avnadmin    false    246            �           0    0 (   organizationusers_organizationuserid_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('"IoT".organizationusers_organizationuserid_seq', 5, true);
          IoT          avnadmin    false    248            �           0    0    readings_readingid_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('"IoT".readings_readingid_seq', 3981, true);
          IoT          avnadmin    false    251            �           0    0 $   rolepermissions_rolepermissionid_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('"IoT".rolepermissions_rolepermissionid_seq', 90, true);
          IoT          avnadmin    false    252            �           0    0    roles_roleid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('"IoT".roles_roleid_seq', 10, true);
          IoT          avnadmin    false    254            �           0    0 $   sensorgatewayassignment_sensorid_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('"IoT".sensorgatewayassignment_sensorid_seq', 1, false);
          IoT          avnadmin    false    259            �           0    0    sensors_sensorid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('"IoT".sensors_sensorid_seq', 8, true);
          IoT          avnadmin    false    257            �           0    0    sensortypes_sensortypeid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('"IoT".sensortypes_sensortypeid_seq', 36, true);
          IoT          avnadmin    false    261            �           0    0    staff_staffid_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('"IoT".staff_staffid_seq', 1, false);
          IoT          avnadmin    false    263            �           0    0 &   staffdeviceassignment_assignmentid_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('"IoT".staffdeviceassignment_assignmentid_seq', 1, false);
          IoT          avnadmin    false    265            �           0    0    userroles_userroleid_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('"IoT".userroles_userroleid_seq', 35, true);
          IoT          avnadmin    false    266            �           0    0    users_userid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('"IoT".users_userid_seq', 21, true);
          IoT          avnadmin    false    268            <           2606    17198 *   alertnotifications alertnotifications_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY "IoT".alertnotifications
    ADD CONSTRAINT alertnotifications_pkey PRIMARY KEY (notificationid);
 S   ALTER TABLE ONLY "IoT".alertnotifications DROP CONSTRAINT alertnotifications_pkey;
       IoT            avnadmin    false    210            >           2606    17200    alerts alerts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY "IoT".alerts
    ADD CONSTRAINT alerts_pkey PRIMARY KEY (alertid);
 ;   ALTER TABLE ONLY "IoT".alerts DROP CONSTRAINT alerts_pkey;
       IoT            avnadmin    false    213            @           2606    17202    alertstatus alertstatus_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY "IoT".alertstatus
    ADD CONSTRAINT alertstatus_pkey PRIMARY KEY (alertid);
 E   ALTER TABLE ONLY "IoT".alertstatus DROP CONSTRAINT alertstatus_pkey;
       IoT            avnadmin    false    215            B           2606    17204    customers customers_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY "IoT".customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customerid);
 A   ALTER TABLE ONLY "IoT".customers DROP CONSTRAINT customers_pkey;
       IoT            avnadmin    false    216            D           2606    17206 ,   departmentdashboard departmentdashboard_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY "IoT".departmentdashboard
    ADD CONSTRAINT departmentdashboard_pkey PRIMARY KEY (departmentdashboardid);
 U   ALTER TABLE ONLY "IoT".departmentdashboard DROP CONSTRAINT departmentdashboard_pkey;
       IoT            avnadmin    false    219            F           2606    17208    departments departments_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY "IoT".departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (departmentid);
 E   ALTER TABLE ONLY "IoT".departments DROP CONSTRAINT departments_pkey;
       IoT            avnadmin    false    220            H           2606    17210 $   departmentusers departmentusers_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY "IoT".departmentusers
    ADD CONSTRAINT departmentusers_pkey PRIMARY KEY (departmentuserid);
 M   ALTER TABLE ONLY "IoT".departmentusers DROP CONSTRAINT departmentusers_pkey;
       IoT            avnadmin    false    223            J           2606    17212 $   devicedashboard devicedashboard_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY "IoT".devicedashboard
    ADD CONSTRAINT devicedashboard_pkey PRIMARY KEY (devicedashboardid);
 M   ALTER TABLE ONLY "IoT".devicedashboard DROP CONSTRAINT devicedashboard_pkey;
       IoT            avnadmin    false    225            L           2606    17214    devices devices_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (deviceid);
 =   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_pkey;
       IoT            avnadmin    false    226            N           2606    17216    deviceusers deviceusers_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY "IoT".deviceusers
    ADD CONSTRAINT deviceusers_pkey PRIMARY KEY (deviceuserid);
 E   ALTER TABLE ONLY "IoT".deviceusers DROP CONSTRAINT deviceusers_pkey;
       IoT            avnadmin    false    229            P           2606    17218 &   escalationlevels escalationlevels_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY "IoT".escalationlevels
    ADD CONSTRAINT escalationlevels_pkey PRIMARY KEY (levelid);
 O   ALTER TABLE ONLY "IoT".escalationlevels DROP CONSTRAINT escalationlevels_pkey;
       IoT            avnadmin    false    230            R           2606    17220 &   escalationstatus escalationstatus_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY "IoT".escalationstatus
    ADD CONSTRAINT escalationstatus_pkey PRIMARY KEY (alertid);
 O   ALTER TABLE ONLY "IoT".escalationstatus DROP CONSTRAINT escalationstatus_pkey;
       IoT            avnadmin    false    233            T           2606    17222    facilities facilities_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY "IoT".facilities
    ADD CONSTRAINT facilities_pkey PRIMARY KEY (facilityid);
 C   ALTER TABLE ONLY "IoT".facilities DROP CONSTRAINT facilities_pkey;
       IoT            avnadmin    false    235            V           2606    17224 (   facilitydashboard facilitydashboard_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY "IoT".facilitydashboard
    ADD CONSTRAINT facilitydashboard_pkey PRIMARY KEY (facilitydashboardid);
 Q   ALTER TABLE ONLY "IoT".facilitydashboard DROP CONSTRAINT facilitydashboard_pkey;
       IoT            avnadmin    false    237            X           2606    17226     facilityusers facilityusers_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY "IoT".facilityusers
    ADD CONSTRAINT facilityusers_pkey PRIMARY KEY (facilityuserid);
 I   ALTER TABLE ONLY "IoT".facilityusers DROP CONSTRAINT facilityusers_pkey;
       IoT            avnadmin    false    239            Z           2606    17228 $   gatewayfailures gatewayfailures_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY "IoT".gatewayfailures
    ADD CONSTRAINT gatewayfailures_pkey PRIMARY KEY (failureid);
 M   ALTER TABLE ONLY "IoT".gatewayfailures DROP CONSTRAINT gatewayfailures_pkey;
       IoT            avnadmin    false    240            \           2606    17230    gateways gateways_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY "IoT".gateways
    ADD CONSTRAINT gateways_pkey PRIMARY KEY (gatewayid);
 ?   ALTER TABLE ONLY "IoT".gateways DROP CONSTRAINT gateways_pkey;
       IoT            avnadmin    false    242            `           2606    17232 (   notificationsetup notificationsetup_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY "IoT".notificationsetup
    ADD CONSTRAINT notificationsetup_pkey PRIMARY KEY (notificationsetupid);
 Q   ALTER TABLE ONLY "IoT".notificationsetup DROP CONSTRAINT notificationsetup_pkey;
       IoT            avnadmin    false    245            b           2606    17234 0   organizationdashboard organizationdashboard_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY "IoT".organizationdashboard
    ADD CONSTRAINT organizationdashboard_pkey PRIMARY KEY (orgdashboardid);
 Y   ALTER TABLE ONLY "IoT".organizationdashboard DROP CONSTRAINT organizationdashboard_pkey;
       IoT            avnadmin    false    247            d           2606    17236 (   organizationusers organizationusers_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY "IoT".organizationusers
    ADD CONSTRAINT organizationusers_pkey PRIMARY KEY (organizationuserid);
 Q   ALTER TABLE ONLY "IoT".organizationusers DROP CONSTRAINT organizationusers_pkey;
       IoT            avnadmin    false    249            f           2606    17238    readings readings_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY "IoT".readings
    ADD CONSTRAINT readings_pkey PRIMARY KEY (readingid);
 ?   ALTER TABLE ONLY "IoT".readings DROP CONSTRAINT readings_pkey;
       IoT            avnadmin    false    250            h           2606    17240 $   rolepermissions rolepermissions_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY "IoT".rolepermissions
    ADD CONSTRAINT rolepermissions_pkey PRIMARY KEY (rolepermissionid);
 M   ALTER TABLE ONLY "IoT".rolepermissions DROP CONSTRAINT rolepermissions_pkey;
       IoT            avnadmin    false    253            j           2606    17242    roles roles_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY "IoT".roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (roleid);
 9   ALTER TABLE ONLY "IoT".roles DROP CONSTRAINT roles_pkey;
       IoT            avnadmin    false    255            n           2606    17244 4   sensorgatewayassignment sensorgatewayassignment_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensorgatewayassignment
    ADD CONSTRAINT sensorgatewayassignment_pkey PRIMARY KEY (sensorid, gatewayid);
 ]   ALTER TABLE ONLY "IoT".sensorgatewayassignment DROP CONSTRAINT sensorgatewayassignment_pkey;
       IoT            avnadmin    false    258    258            l           2606    17246    sensors sensors_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY "IoT".sensors
    ADD CONSTRAINT sensors_pkey PRIMARY KEY (sensorid);
 =   ALTER TABLE ONLY "IoT".sensors DROP CONSTRAINT sensors_pkey;
       IoT            avnadmin    false    256            p           2606    17248    sensortypes sensortypes_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY "IoT".sensortypes
    ADD CONSTRAINT sensortypes_pkey PRIMARY KEY (sensortypeid);
 E   ALTER TABLE ONLY "IoT".sensortypes DROP CONSTRAINT sensortypes_pkey;
       IoT            avnadmin    false    260            r           2606    17250    staff staff_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY "IoT".staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (staffid);
 9   ALTER TABLE ONLY "IoT".staff DROP CONSTRAINT staff_pkey;
       IoT            avnadmin    false    262            t           2606    17252 0   staffdeviceassignment staffdeviceassignment_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY "IoT".staffdeviceassignment
    ADD CONSTRAINT staffdeviceassignment_pkey PRIMARY KEY (assignmentid);
 Y   ALTER TABLE ONLY "IoT".staffdeviceassignment DROP CONSTRAINT staffdeviceassignment_pkey;
       IoT            avnadmin    false    264            ^           2606    17254    gateways unique_gateway_id 
   CONSTRAINT     Z   ALTER TABLE ONLY "IoT".gateways
    ADD CONSTRAINT unique_gateway_id UNIQUE (gateway_id);
 C   ALTER TABLE ONLY "IoT".gateways DROP CONSTRAINT unique_gateway_id;
       IoT            avnadmin    false    242            v           2606    17256    userroles userroles_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY "IoT".userroles
    ADD CONSTRAINT userroles_pkey PRIMARY KEY (userroleid);
 A   ALTER TABLE ONLY "IoT".userroles DROP CONSTRAINT userroles_pkey;
       IoT            avnadmin    false    267            x           2606    17258    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY "IoT".users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 9   ALTER TABLE ONLY "IoT".users DROP CONSTRAINT users_pkey;
       IoT            avnadmin    false    269            y           2606    17259 3   alertnotifications alertnotifications_deviceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alertnotifications
    ADD CONSTRAINT alertnotifications_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES "IoT".devices(deviceid);
 \   ALTER TABLE ONLY "IoT".alertnotifications DROP CONSTRAINT alertnotifications_deviceid_fkey;
       IoT          avnadmin    false    210    4428    226            z           2606    17264 2   alertnotifications alertnotifications_staffid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alertnotifications
    ADD CONSTRAINT alertnotifications_staffid_fkey FOREIGN KEY (staffid) REFERENCES "IoT".staff(staffid);
 [   ALTER TABLE ONLY "IoT".alertnotifications DROP CONSTRAINT alertnotifications_staffid_fkey;
       IoT          avnadmin    false    210    4466    262            {           2606    17269 !   alerts alerts_acknowledgedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alerts
    ADD CONSTRAINT alerts_acknowledgedby_fkey FOREIGN KEY (acknowledgedby) REFERENCES "IoT".staff(staffid);
 J   ALTER TABLE ONLY "IoT".alerts DROP CONSTRAINT alerts_acknowledgedby_fkey;
       IoT          avnadmin    false    4466    213    262            |           2606    17274    alerts alerts_escalatedto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alerts
    ADD CONSTRAINT alerts_escalatedto_fkey FOREIGN KEY (escalatedto) REFERENCES "IoT".staff(staffid);
 G   ALTER TABLE ONLY "IoT".alerts DROP CONSTRAINT alerts_escalatedto_fkey;
       IoT          avnadmin    false    262    4466    213            }           2606    17279    alerts alerts_sensorid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alerts
    ADD CONSTRAINT alerts_sensorid_fkey FOREIGN KEY (sensorid) REFERENCES "IoT".sensors(sensorid);
 D   ALTER TABLE ONLY "IoT".alerts DROP CONSTRAINT alerts_sensorid_fkey;
       IoT          avnadmin    false    256    213    4460            ~           2606    17284 $   alertstatus alertstatus_alertid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alertstatus
    ADD CONSTRAINT alertstatus_alertid_fkey FOREIGN KEY (alertid) REFERENCES "IoT".alerts(alertid);
 M   ALTER TABLE ONLY "IoT".alertstatus DROP CONSTRAINT alertstatus_alertid_fkey;
       IoT          avnadmin    false    213    4414    215                       2606    17289 "   customers customers_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".customers
    ADD CONSTRAINT customers_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 K   ALTER TABLE ONLY "IoT".customers DROP CONSTRAINT customers_createdby_fkey;
       IoT          avnadmin    false    269    216    4472            �           2606    17294 "   customers customers_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".customers
    ADD CONSTRAINT customers_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 K   ALTER TABLE ONLY "IoT".customers DROP CONSTRAINT customers_updatedby_fkey;
       IoT          avnadmin    false    216    4472    269            �           2606    17299 /   organizationdashboard dashboard_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".organizationdashboard
    ADD CONSTRAINT dashboard_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid);
 X   ALTER TABLE ONLY "IoT".organizationdashboard DROP CONSTRAINT dashboard_customerid_fkey;
       IoT          avnadmin    false    4418    247    216            �           2606    17304 9   departmentdashboard departmentdashboard_departmentid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".departmentdashboard
    ADD CONSTRAINT departmentdashboard_departmentid_fkey FOREIGN KEY (departmentid) REFERENCES "IoT".departments(departmentid);
 b   ALTER TABLE ONLY "IoT".departmentdashboard DROP CONSTRAINT departmentdashboard_departmentid_fkey;
       IoT          avnadmin    false    219    4422    220            �           2606    17309 &   departments departments_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".departments
    ADD CONSTRAINT departments_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 O   ALTER TABLE ONLY "IoT".departments DROP CONSTRAINT departments_createdby_fkey;
       IoT          avnadmin    false    269    4472    220            �           2606    17314 '   departments departments_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".departments
    ADD CONSTRAINT departments_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid) NOT VALID;
 P   ALTER TABLE ONLY "IoT".departments DROP CONSTRAINT departments_customerid_fkey;
       IoT          avnadmin    false    4418    216    220            �           2606    17319 '   departments departments_facilityid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".departments
    ADD CONSTRAINT departments_facilityid_fkey FOREIGN KEY (facilityid) REFERENCES "IoT".facilities(facilityid) NOT VALID;
 P   ALTER TABLE ONLY "IoT".departments DROP CONSTRAINT departments_facilityid_fkey;
       IoT          avnadmin    false    4436    220    235            �           2606    17324 &   departments departments_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".departments
    ADD CONSTRAINT departments_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 O   ALTER TABLE ONLY "IoT".departments DROP CONSTRAINT departments_updatedby_fkey;
       IoT          avnadmin    false    4472    269    220            �           2606    17329 1   departmentusers departmentusers_departmentid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".departmentusers
    ADD CONSTRAINT departmentusers_departmentid_fkey FOREIGN KEY (departmentid) REFERENCES "IoT".departments(departmentid);
 Z   ALTER TABLE ONLY "IoT".departmentusers DROP CONSTRAINT departmentusers_departmentid_fkey;
       IoT          avnadmin    false    223    220    4422            �           2606    17334 +   departmentusers departmentusers_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".departmentusers
    ADD CONSTRAINT departmentusers_userid_fkey FOREIGN KEY (userid) REFERENCES "IoT".users(userid);
 T   ALTER TABLE ONLY "IoT".departmentusers DROP CONSTRAINT departmentusers_userid_fkey;
       IoT          avnadmin    false    223    269    4472            �           2606    17339 -   devicedashboard devicedashboard_deviceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".devicedashboard
    ADD CONSTRAINT devicedashboard_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES "IoT".devices(deviceid);
 V   ALTER TABLE ONLY "IoT".devicedashboard DROP CONSTRAINT devicedashboard_deviceid_fkey;
       IoT          avnadmin    false    4428    226    225            �           2606    17344    devices devices_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 G   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_createdby_fkey;
       IoT          avnadmin    false    4472    226    269            �           2606    17349    devices devices_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid) NOT VALID;
 H   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_customerid_fkey;
       IoT          avnadmin    false    226    216    4418            �           2606    17354 !   devices devices_departmentid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_departmentid_fkey FOREIGN KEY (departmentid) REFERENCES "IoT".departments(departmentid);
 J   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_departmentid_fkey;
       IoT          avnadmin    false    220    226    4422            �           2606    17359    devices devices_facilityid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_facilityid_fkey FOREIGN KEY (facilityid) REFERENCES "IoT".facilities(facilityid) NOT VALID;
 H   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_facilityid_fkey;
       IoT          avnadmin    false    4436    235    226            �           2606    17364    devices devices_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 G   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_updatedby_fkey;
       IoT          avnadmin    false    4472    226    269            �           2606    17369 %   deviceusers deviceusers_deviceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".deviceusers
    ADD CONSTRAINT deviceusers_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES "IoT".devices(deviceid);
 N   ALTER TABLE ONLY "IoT".deviceusers DROP CONSTRAINT deviceusers_deviceid_fkey;
       IoT          avnadmin    false    4428    229    226            �           2606    17374 #   deviceusers deviceusers_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".deviceusers
    ADD CONSTRAINT deviceusers_userid_fkey FOREIGN KEY (userid) REFERENCES "IoT".users(userid);
 L   ALTER TABLE ONLY "IoT".deviceusers DROP CONSTRAINT deviceusers_userid_fkey;
       IoT          avnadmin    false    4472    229    269            �           2606    17379 .   escalationstatus escalationstatus_alertid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".escalationstatus
    ADD CONSTRAINT escalationstatus_alertid_fkey FOREIGN KEY (alertid) REFERENCES "IoT".alerts(alertid);
 W   ALTER TABLE ONLY "IoT".escalationstatus DROP CONSTRAINT escalationstatus_alertid_fkey;
       IoT          avnadmin    false    233    4414    213            �           2606    17384 .   escalationstatus escalationstatus_levelid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".escalationstatus
    ADD CONSTRAINT escalationstatus_levelid_fkey FOREIGN KEY (levelid) REFERENCES "IoT".escalationlevels(levelid);
 W   ALTER TABLE ONLY "IoT".escalationstatus DROP CONSTRAINT escalationstatus_levelid_fkey;
       IoT          avnadmin    false    233    4432    230            �           2606    17389 .   escalationstatus escalationstatus_staffid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".escalationstatus
    ADD CONSTRAINT escalationstatus_staffid_fkey FOREIGN KEY (staffid) REFERENCES "IoT".staff(staffid);
 W   ALTER TABLE ONLY "IoT".escalationstatus DROP CONSTRAINT escalationstatus_staffid_fkey;
       IoT          avnadmin    false    262    233    4466            �           2606    17394 $   facilities facilities_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".facilities
    ADD CONSTRAINT facilities_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 M   ALTER TABLE ONLY "IoT".facilities DROP CONSTRAINT facilities_createdby_fkey;
       IoT          avnadmin    false    269    4472    235            �           2606    17399 %   facilities facilities_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".facilities
    ADD CONSTRAINT facilities_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid);
 N   ALTER TABLE ONLY "IoT".facilities DROP CONSTRAINT facilities_customerid_fkey;
       IoT          avnadmin    false    235    216    4418            �           2606    17404 $   facilities facilities_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".facilities
    ADD CONSTRAINT facilities_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 M   ALTER TABLE ONLY "IoT".facilities DROP CONSTRAINT facilities_updatedby_fkey;
       IoT          avnadmin    false    4472    235    269            �           2606    17409 3   facilitydashboard facilitydashboard_facilityid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".facilitydashboard
    ADD CONSTRAINT facilitydashboard_facilityid_fkey FOREIGN KEY (facilityid) REFERENCES "IoT".facilities(facilityid);
 \   ALTER TABLE ONLY "IoT".facilitydashboard DROP CONSTRAINT facilitydashboard_facilityid_fkey;
       IoT          avnadmin    false    235    4436    237            �           2606    17414 +   facilityusers facilityusers_facilityid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".facilityusers
    ADD CONSTRAINT facilityusers_facilityid_fkey FOREIGN KEY (facilityid) REFERENCES "IoT".facilities(facilityid);
 T   ALTER TABLE ONLY "IoT".facilityusers DROP CONSTRAINT facilityusers_facilityid_fkey;
       IoT          avnadmin    false    235    4436    239            �           2606    17419 '   facilityusers facilityusers_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".facilityusers
    ADD CONSTRAINT facilityusers_userid_fkey FOREIGN KEY (userid) REFERENCES "IoT".users(userid);
 P   ALTER TABLE ONLY "IoT".facilityusers DROP CONSTRAINT facilityusers_userid_fkey;
       IoT          avnadmin    false    4472    269    239            �           2606    17424 .   gatewayfailures gatewayfailures_gatewayid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".gatewayfailures
    ADD CONSTRAINT gatewayfailures_gatewayid_fkey FOREIGN KEY (gatewayid) REFERENCES "IoT".gateways(gatewayid);
 W   ALTER TABLE ONLY "IoT".gatewayfailures DROP CONSTRAINT gatewayfailures_gatewayid_fkey;
       IoT          avnadmin    false    4444    240    242            �           2606    17429     gateways gateways_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".gateways
    ADD CONSTRAINT gateways_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 I   ALTER TABLE ONLY "IoT".gateways DROP CONSTRAINT gateways_createdby_fkey;
       IoT          avnadmin    false    269    242    4472            �           2606    17434 !   gateways gateways_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".gateways
    ADD CONSTRAINT gateways_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid);
 J   ALTER TABLE ONLY "IoT".gateways DROP CONSTRAINT gateways_customerid_fkey;
       IoT          avnadmin    false    242    4418    216            �           2606    17439     gateways gateways_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".gateways
    ADD CONSTRAINT gateways_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 I   ALTER TABLE ONLY "IoT".gateways DROP CONSTRAINT gateways_updatedby_fkey;
       IoT          avnadmin    false    269    4472    242            �           2606    17444 3   notificationsetup notificationsetup_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".notificationsetup
    ADD CONSTRAINT notificationsetup_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid);
 \   ALTER TABLE ONLY "IoT".notificationsetup DROP CONSTRAINT notificationsetup_customerid_fkey;
       IoT          avnadmin    false    245    4418    216            �           2606    17449 /   notificationsetup notificationsetup_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".notificationsetup
    ADD CONSTRAINT notificationsetup_userid_fkey FOREIGN KEY (userid) REFERENCES "IoT".users(userid);
 X   ALTER TABLE ONLY "IoT".notificationsetup DROP CONSTRAINT notificationsetup_userid_fkey;
       IoT          avnadmin    false    4472    245    269            �           2606    17454 3   organizationusers organizationusers_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".organizationusers
    ADD CONSTRAINT organizationusers_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid);
 \   ALTER TABLE ONLY "IoT".organizationusers DROP CONSTRAINT organizationusers_customerid_fkey;
       IoT          avnadmin    false    216    249    4418            �           2606    17459 /   organizationusers organizationusers_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".organizationusers
    ADD CONSTRAINT organizationusers_userid_fkey FOREIGN KEY (userid) REFERENCES "IoT".users(userid);
 X   ALTER TABLE ONLY "IoT".organizationusers DROP CONSTRAINT organizationusers_userid_fkey;
       IoT          avnadmin    false    269    249    4472            �           2606    17464    readings readings_deviceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".readings
    ADD CONSTRAINT readings_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES "IoT".devices(deviceid);
 H   ALTER TABLE ONLY "IoT".readings DROP CONSTRAINT readings_deviceid_fkey;
       IoT          avnadmin    false    226    4428    250            �           2606    17469     readings readings_gatewayid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".readings
    ADD CONSTRAINT readings_gatewayid_fkey FOREIGN KEY (gatewayid) REFERENCES "IoT".gateways(gatewayid);
 I   ALTER TABLE ONLY "IoT".readings DROP CONSTRAINT readings_gatewayid_fkey;
       IoT          avnadmin    false    242    4444    250            �           2606    17474    readings readings_sensorid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".readings
    ADD CONSTRAINT readings_sensorid_fkey FOREIGN KEY (sensorid) REFERENCES "IoT".sensors(sensorid);
 H   ALTER TABLE ONLY "IoT".readings DROP CONSTRAINT readings_sensorid_fkey;
       IoT          avnadmin    false    250    4460    256            �           2606    17479 +   rolepermissions rolepermissions_roleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".rolepermissions
    ADD CONSTRAINT rolepermissions_roleid_fkey FOREIGN KEY (roleid) REFERENCES "IoT".roles(roleid);
 T   ALTER TABLE ONLY "IoT".rolepermissions DROP CONSTRAINT rolepermissions_roleid_fkey;
       IoT          avnadmin    false    255    253    4458            �           2606    17484 >   sensorgatewayassignment sensorgatewayassignment_gatewayid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensorgatewayassignment
    ADD CONSTRAINT sensorgatewayassignment_gatewayid_fkey FOREIGN KEY (gatewayid) REFERENCES "IoT".gateways(gatewayid);
 g   ALTER TABLE ONLY "IoT".sensorgatewayassignment DROP CONSTRAINT sensorgatewayassignment_gatewayid_fkey;
       IoT          avnadmin    false    242    258    4444            �           2606    17489 =   sensorgatewayassignment sensorgatewayassignment_sensorid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensorgatewayassignment
    ADD CONSTRAINT sensorgatewayassignment_sensorid_fkey FOREIGN KEY (sensorid) REFERENCES "IoT".sensors(sensorid);
 f   ALTER TABLE ONLY "IoT".sensorgatewayassignment DROP CONSTRAINT sensorgatewayassignment_sensorid_fkey;
       IoT          avnadmin    false    256    258    4460            �           2606    17494    sensors sensors_assignedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensors
    ADD CONSTRAINT sensors_assignedby_fkey FOREIGN KEY (assigned_by) REFERENCES "IoT".users(userid) NOT VALID;
 H   ALTER TABLE ONLY "IoT".sensors DROP CONSTRAINT sensors_assignedby_fkey;
       IoT          avnadmin    false    269    256    4472            �           2606    17499    sensors sensors_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensors
    ADD CONSTRAINT sensors_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid) NOT VALID;
 H   ALTER TABLE ONLY "IoT".sensors DROP CONSTRAINT sensors_customerid_fkey;
       IoT          avnadmin    false    256    216    4418            �           2606    17504    sensors sensors_deviceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensors
    ADD CONSTRAINT sensors_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES "IoT".devices(deviceid);
 F   ALTER TABLE ONLY "IoT".sensors DROP CONSTRAINT sensors_deviceid_fkey;
       IoT          avnadmin    false    4428    256    226            �           2606    17509 %   sensortypes sensortypes_sensorid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensortypes
    ADD CONSTRAINT sensortypes_sensorid_fkey FOREIGN KEY (sensorid) REFERENCES "IoT".sensors(sensorid) NOT VALID;
 N   ALTER TABLE ONLY "IoT".sensortypes DROP CONSTRAINT sensortypes_sensorid_fkey;
       IoT          avnadmin    false    256    4460    260            �           2606    17514 &   sensortypes sensortypes_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensortypes
    ADD CONSTRAINT sensortypes_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 O   ALTER TABLE ONLY "IoT".sensortypes DROP CONSTRAINT sensortypes_updatedby_fkey;
       IoT          avnadmin    false    4472    260    269            �           2606    17519    staff staff_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".staff
    ADD CONSTRAINT staff_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 C   ALTER TABLE ONLY "IoT".staff DROP CONSTRAINT staff_createdby_fkey;
       IoT          avnadmin    false    4472    269    262            �           2606    17524    staff staff_departmentid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".staff
    ADD CONSTRAINT staff_departmentid_fkey FOREIGN KEY (departmentid) REFERENCES "IoT".departments(departmentid);
 F   ALTER TABLE ONLY "IoT".staff DROP CONSTRAINT staff_departmentid_fkey;
       IoT          avnadmin    false    220    4422    262            �           2606    17529    staff staff_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".staff
    ADD CONSTRAINT staff_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 C   ALTER TABLE ONLY "IoT".staff DROP CONSTRAINT staff_updatedby_fkey;
       IoT          avnadmin    false    4472    269    262            �           2606    17534 9   staffdeviceassignment staffdeviceassignment_deviceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".staffdeviceassignment
    ADD CONSTRAINT staffdeviceassignment_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES "IoT".devices(deviceid);
 b   ALTER TABLE ONLY "IoT".staffdeviceassignment DROP CONSTRAINT staffdeviceassignment_deviceid_fkey;
       IoT          avnadmin    false    226    264    4428            �           2606    17539 8   staffdeviceassignment staffdeviceassignment_staffid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".staffdeviceassignment
    ADD CONSTRAINT staffdeviceassignment_staffid_fkey FOREIGN KEY (staffid) REFERENCES "IoT".staff(staffid);
 a   ALTER TABLE ONLY "IoT".staffdeviceassignment DROP CONSTRAINT staffdeviceassignment_staffid_fkey;
       IoT          avnadmin    false    262    4466    264            �           2606    17544    userroles userroles_roleid_fkey    FK CONSTRAINT        ALTER TABLE ONLY "IoT".userroles
    ADD CONSTRAINT userroles_roleid_fkey FOREIGN KEY (roleid) REFERENCES "IoT".roles(roleid);
 H   ALTER TABLE ONLY "IoT".userroles DROP CONSTRAINT userroles_roleid_fkey;
       IoT          avnadmin    false    255    4458    267            �           2606    17549    userroles userroles_userid_fkey    FK CONSTRAINT        ALTER TABLE ONLY "IoT".userroles
    ADD CONSTRAINT userroles_userid_fkey FOREIGN KEY (userid) REFERENCES "IoT".users(userid);
 H   ALTER TABLE ONLY "IoT".userroles DROP CONSTRAINT userroles_userid_fkey;
       IoT          avnadmin    false    269    267    4472            ?      x������ � �      B      x������ � �      D      x������ � �      E   �  x����N�0���O�}U��8^qـDi:,��8�Ј&F&.O?N3��@B�":�����a��p5�R���¯x����5e�����7�\�
����Rv�x��/��}gn��8�b��\PL�U��19��� K_�
�f �Rpu���$LSH����UW��M�����Ue}p[�r����F|\6ϯ~��1̸U�9aROƇ~3H2
�dBbP�(��� ��(�M�>@xSj�z03|���NN���>�N�+��sL��JE(�&�C��[�AB"л.Hd�"&�m��8��o; +��|ґ��Gz%�{"���2Ļ�R�b29�`�>B�'$$�-�`Q^���?�+A��7Q�f�)��TF"������Q����=H�π�H�~�]�����֮���VTh"r3�<�L22��g$����|�+���%      H      x�3�4�,�2��1z\\\ ��      I   A  x�u�1O�0��˯�����M�B Bb�b5Nc��*q	��8����;��ޝ9<�V���(� �����P(DZ��o�PEI٪�x�W]���i��]p�}�܇���gd�3NX�ƕ(�׋�7�^wu��#�X����A�J"�\�(Ҝ��խ�/��>�MK3��$Oi���k�%��;߄��h�'�f��Ѕ�	䏋�9&��T��a��7ij���6��1�:3{��$���}t�G�[�묂��0^�_���T��e����E��՜���t�obZ*�����Hm����gρ���)�-Ͳ�WG�m      L   #   x�3�4�4�,�2��&@�9�%��%����� Lk�      N      x������ � �      O   m  x����n�0���S�X^l��j�6��*�z����&��DJ��K�$(m�\��<Æ�Zm;� ´*�~j���|*w��\�<b���A4*b�Ĩ���B�Yz<�s��cc�?0�p�BLF�$a�!F�)�8��ҟٌ��b#�(ՏyMk�@^��������6K�G�[���7�6R�Y���#L��C{^�"m*����0���]{�>��H��xT�A��&s����k�VaR����7��>�_��k��N� �0B��3��J���EV �mN+����]U���U�3�u΍DEzT�!�rz��V%E2����I���֢dZ_�.���9��s�y����~      R   ,   x�3�4��,�2��442̀\# Ü�Ѐ��Ȋ���� � J      S      x������ � �      V      x������ � �      X   �  x�u�Ko�0�ϫ_�{!�O�N1�>4E7�ŗ�HGD%�У���K)nZ#1�{��of<X�'�,������ܥ�|���~zش=`R0�q!$\.7O=��6��)�2�<e�����b�悿c�,����E��j-ViY�dp�q��lql뀃����`3:|��kt��&�f��>���KFva-��g`PY��V�ظ�M'4��B]qq%a�y%8-�~É�TF�(I���|Ӈ*`2ޞ��g��o���yfn�Og<gǵ��n;��E�r�W�Y*�R+*%h��fW�b�*unaa�q��/k.�]��[Њ��߆.�u��Ǉ$�/�iɇ3��ࡵ���Т��&���X��ll�S���\�\�����y!/���K���m{�!n�>���&I��h      Z      x�3�4�,�2�4�1z\\\ ��      \   "   x�3�4�.3NSNCÜӌ��Ȉ���� K��      ]      x������ � �      _      x������ � �      b   r   x�3�LI-H,*IM�M,IuH�M���K����"#Ns��40�FFƺ�����
�V&VF�zF��xd9�L������M7����t=33��å@���qqq r�+M      d   *   x�3�4�,�2�4�Ɯf@҄�H�r� I3N ���� �(z      f   3   x��;  D����=�*P@�	p�fL|WA��lU:�\c���,<s�Hz۪=      g      x���K�$Ir]Ǖ��:�������"� B
�p�T������p�k�X�=�����?������{~��G1�?c��*�������������������-��������?����H!����8�[L_%}��hy�Z�?ҷn���Q�������d���[���ǟ��ǿ�8ڬ�W4�W���gic���|k�G������������z%[_e���FT����'͏���q������Uǣ�^r����W��N��s)���\�^��)�v��Wɏ\S�-��c���ԛ�Rj1���Ճ�OZQ<Z�,Vr
�WYC�%��#�.�����ޮ��,��%��J�U�'֞�}����:}��ʏ����L�5�2�����������}����hc�����OM���_���.��A.�Z��i���V����mlI�z5�ޯ!��k�o��b���W!�2b̅岐���0��UJr�z�1Đ~���P靚}�H)���r��W�n�+�s��f�$�ē��N��t��X
u�wP{Iח�k=�8f	?��Rh���R��LJ��`��T�h���k
�~�,σ���ٻ��zY����Y�ō��G����ڏ,�@*���J)'�@^����U�����Z���e���ڛ�CH�5P�s=�q�u�Gͱt�oƏ,yh�S{�6�TR��,��.}�+ڃ�贯��:�;�7�R��5�~2Q��u$>F����zK?�<
�;�7� ��pi���A�9�G�������!R-��D��P&-U<Ĥ��Gs3i�
�QZ��IV�u8�TK�3�ǤZk��������J9jd�Q��̼L��x�(�V�P&���t�����'&�U���aR�B�c4Z�d?�5�u�gR-'���IۓI��<U�灛II� �v]:uS�Q_���I�T��e�œAL��R���I��0i�灛I�WΏTk��-������~��M�d��G��~=����e��ķt�������ȋ�J��E���y0t�6���w_p���<ܸ�~h!��e��Y<����
!��U���.��完��]�����h .i�\2N���H�� \���<^�ˣ
)��t�.�' qy����py����3���.O�7���3�׊��� ��2��S�(.O(Epy�Հ���� \�b)����Z�x9�9�9�tF�'�� m2��Lǘ9i�h&ţ��Z 6ǰ����<Pp�Q�Lr�Q��c4�� ;�(		����=�(W��1���s��*# ���E*��UA$�Q����d�c�5E�$�2��1IDB9:&�D�k!�J$������c5D��O,�L) 0�X0MǬ4��Qe�Q����e�c��%���`F�:f�U��:����*�3u-4���B?\��~?���S�K(S�T3��e���Z�a�.2�
1u��c�b�V��)g���2SW� ��y��!L���SWT����4��*�3u��S�l3��M�h����$����4�L�T�e��+������!>2u�y����H���)K�2�JA�L���F���u3�kf�.S0Sw����������*3u?Q�������O&�4��C���*3����m�V	i����BL=Ty^�0��*t6�N�-�!�B�N���T^�����6�`��0xHQ]L������6�L=�[�_����V����)WC�����JJ_c��䆖�	��ȴ_Nպs������ϖ>��*��L���_9=
1�u��Y�D,p���h��R{��L�F�e)����S��<
sR�?s-��O�I�2S�ѓK!�t����θ��$�����>\g�7z��|�����K/����^d�qa";=B$'=HK��:�e�~��,�u���!���v�I�`"=yFԷ�^/=r.��:;�� Ӹ��o�TKO��Կw��5�9C,�'�E{��o�a!��b/1�o=:\G�3uz��H�}f�7Z�k5~-���?�I���T���k��F���Z]���N7�&G�����bM�����\�-g�_��1x�@>��������ђ�����k}�Vfj����������V�N:�%MK�0s<��F��T*�:���S�T.c�/��t2�>i���<�b���ՀakR��(���z�lMIu��ؚtn�֤�AlM���֔� akz�J�ؚT�3��)˥ c��{��U4>�V��>����i[��lE��(G�bk�g��*?a��O��Z����T���Z��������[S��\٨5�qÿUMHjl��^q	�V+9�`k5����4���v��F�j���֪
� l����o�1��Z��ak=mM�l�5�s����F[S;mM�'��v.ښ��hkzML��Ɂ����_mК"?3h]鬴[w=,��zt6�B[f�av,ں�a��]���z���p��������~0��G[��h�8m����n�9T���!��݁��R��+LZj5L��z����`�u`�V����B��2������Mk������V��F�u�����[|��#����K9�UM:8�������&D��9y���l��4~#+#Ozϕ���y�(O���k'��zj����*���'\���Gﻞtò�-�b�x���N/5�G�@f������]�1dc����\�:�>���;��,$�\���w=_V�{~����K[ତ�Z���������2��h�������$8�����I�L'� �GZj�����7z*A�w���V��N��o�ܐztX��zj������h���IϜ�z��Z����x���u�|O�61���@r��]Le'� �}�<W����O������q������K�A_\&��I6H��Ыn`{=#|n ��sa$�Dh��j����Q�7�����R;�%��E���v-��n�+}�����������%'S��@��%LFw��9���:����܅�� _CΥ�G����v��������o�@I띔@_�R���f�Iw���*W�M7��ʼvv��-�?J1��	j�JZ8����(�Я{2�Pz��o�m�uZOu[���&v���_/�C�|�A�k|���s������bri� on��[%X��WS)���|%��uD��6��[�}����z��elz>w��������D��<����7�c��v��w��w�����V�I��p�N����;=mu���㺥A&�=��]K��z�}>oQ��U�!=�.|���u��:�}r�Ө-�4�<9���^��'��]n@?[��~��9��_:���a��Z��[={'Vb���V֠�$4�ws��Z��,x'!7�f�����w��,���A?6�B0װ��O�Bs������l=�Z�����{�����c�ζ�����y\ϦgT�"��5���ל�Y���>�z�\!�\O�(�5v=j0�����H������2�]Ϯ'O����n��ͅ�v��GM�\ϐKs=èD\�𹊏����p[o�r]��UD}t=�)o���)��?&�v=zN8�z��Y@�g�9mT&����n�
��u���P%�Pص�:�:��9��:��:��9��:��:��9��9�gQ2WCu:Zia�Hb����0gAzt@q�X�qVғ�bx��.�W9��
gQ�_�,J<�,J<�,J:�,��t�΢��΢��΢�s΢��΢��΢�.m�Y�t�Yݨ:���:���:���9���:���:���:���9��1g���s�Fny�#"+gQ�b;�,�Ag��ڨ�('�E9�,�}ը�(��E9�,�agQ;}u5�,�AgQO:��F�E=�,�Ig�������_5�)�2�H����g�q��g�����%�g j��U�Yh�8����G6�z�:��u��,61�Y���5Zu��J�Ŧ�8�ML.��T��v��t�@g��΢�Z|�����+tZ���b��Ŧ8�g�E�%Q:�<=^�;�Ŧ:��ã�1so���:�����!-�~��b�R΢:��dWFˠ�!�1�����Sy�K1�Y̯L9�HGY�8�Mt�� ��H�A����3�r�    E]�$��S�L�t��,��I��;��,6-�Y�S�8�6���nM�J�z�C;o؄X���q/�ozX��ѫ�9�1F%ҜjP���7���������)z���|�㺣7z�>���#m�{qHK]=���]�_6�v�a<�ul�+�[D�}�>l�Z��e_��]�#u<jt`k]�iF#�ɬIb�e7��zr)���ӣW6��H$��?9�u׫�n{�X�.�iu��ކ��Wy!�V9l*�U.��]O��U�~鷶u@Z�Uw�*=_�%G��u��'�k����q��&�I�������]Lr�*�e���9Ck�>�(ʹ�Vw�۷��G0{L�ؒ���P=]���+%�h��g�=���f -����驛��]��G��(�I/����]K�/�>Z�3��a�2��ji�wT��l��~�ף���vL�@�H�>aS��šo������u�/u�-�5e�+�r��7��|5_���M�v�ٱ���$��ɒ�ҭ8��*W��8�.��w����;k){팃�z����0�-�G�3h(6=�Plb��XC>sN��g�
��Rخ8�.��n�޾�g�7�X�NHO~�b���]Ϸ��M�7���MO�F����f����`y��a�G�z*-���1:���;�Je��q�I�1�����T*��ZKO���\�H�+��Lzr]��Xv15���sw9�裫rf��7-峽�^��|��,5'��#�^����཮�P�?��NJ���s�w=5R�j����$��1�����w������m��y�R#�$�m�f� y�2.����	��|J��CUa�3Լ�)`���Z7��2Ȥ'� obwg��E�o"��i]E�˛�,.���w��_:]��awTo|$Î̲�?\����m1T:���Y6���Y6���e���P3��U+]S��uҢ׳�]�fK�e�>�ĳ�-�ʛyGf�Xz�,K�ec�9�&_�֥ŵ҄�s}��CͲqŜ-=��pa���cel�`�VՇ]�[��1jfB}�ֻ;����f�l�9�,[��e�b�HX�ت۰]غ6&�\B���ޔg�#�l��8�ul}�t��}���Q
{[-=u��[�_0�s�z��d��ױ�Ғ��#^�5�G.|{��Ū�����kx	�V=W�֩ ��`�:���M݈�`kS)k[[��Q ��t�����O�ڂm���M�ǰ�y.@�ڂLI@��T����h�qM߅bk�H���C����������� ���D[wlm�Jl[[�m5���hkK��-����t.��m�I�%mE������3�n���%$ں�fKw�����+�bk�2ڊ`k���M_�bk��i�ҏ}V��:��@zF2��Zb碭M�X��
L����镃��M7����pK�`�����֦'���
M70�n靍�6hr��W�E[���b�n�F�UOG����pK�l���������(��s��V�F[[;mm�\���+�Qlmg�������v6��ڹhkk*�z��v�cf�c&��W���B��"�ɥ�+�5N݈}S���:�,g`��Ƙ�߭m5�#�r�޹����ֶ�~���u���@�~�����k[-1Y��1��J�L=|�֏L=�~9K����#S�����Cv�AL=��9K�3�Z5T�L=�v�YZ`ל�`�O�1���4O�kn�B������,��]s��4��]]|�2uw��,-�kn��.��Swq�5��]$�A��*9�2uHۜ�|H�܎�]�!����k��{��`��ܙ�LMZ�^�XS���4�Rɇ����<ۦW�?��61�Q���k���h����f�Q�d�|s�>1u�C�A��b8��=�<�'��I&!����k��{�g��]%�Q����k�����ܝhCKtB��HOMoo����RL% \L��ry��{5����0����W�Lݳ<# ��ycꮚ�a��	j����S�5�����cK���c[K�ž��������"Lm�n�0uQ��!�~MP{��=g&�<"w�w�5��`齆[A�V]�0S��i��Uffj�52��J�L]��6fm_�?x^�3ӧ[UX�ˬ�^��p�/���u��V71�!Z��8��!�0���4L�Mƕ ZU=�0�6�0Zm����&�4D��:k7�>�%��O�&=y2�hU���鰾�˴ʗ]�X��'-Vr�^��T���.'C����nZ}�K��������&��n�&3���%�4�r�0��#U��7(���R��V�hU5Kô:Q�O@���aZ)i�V�to�VE�4H�b�7J���j�V'a������H��1��#�N ��s�W��i���M�plu��΃��y6�:����gc�#���� �V`���V71[Ehu�l4H�Cg�AZ�\lu0��s���Z��ށpă����VG<[�lluă��񚎮��ޘ_R�|��4g�-�Ǭr�e���Z�r���k�&�lCA�Pyj�G:W�1�ٲ���m��m�'�r���66-�lcs^?A��.�6��E��}K5�C]Q�@��WT��>�+��'�_�����tE�z�:�7�<	gI��ѫ��^׃�l�����r�P�Æ�4尡('E9h(�aCQ@C���HpbK<�4�c(6�Æ�4���6���4�����E=l(��Ԑ����������h�N_���4z�7j(�IC��v�P���B_Q
�~jCO�O
}95d(�AC�Lm�6�����Æ�4���йk�P���B�F�8h(�aC1N�q�P�Æb6㠡��<h(�IC1O
=�5��Ԉ����<i(^�׵�i(b�#��Z�ډ1���|š�wU�D>?��7ղ3�71|U�}�����0C����9���,9��TǆkX����M3q] �:A{���p�Ů�]L.�u����Ҹڙ�e�C�$�5�nz�y��i+�����F��i�j�v1��i�5Oo�3�^��&�g�1�R5O��-=�找_�1���i����^wB�G.�1�P)ғ�b:Ů:
ڔ��l��oU��g�UG�����9W%�Nɡ��(6�l|$�E\���Y����^9�7KỂ��]�á����~�׳�gw�R��TR�FZ�m)������v�����!��S.f����k���kw���hD�Z]���gwv�׳�J�8���˷YRi�(�N_�f�[z��_q>Hn�^�|��Q$�������F�tд^f$-�Uқ��
��+����t�z	E�IxQz��Iw1��4v7��m�6���~�]�'�����B�ʛei��\�וJ^�Qz�s��n(ݾr�<��*���v���7�?���Xu���71�0T=(��y��2�S_G�E�MϢ$Jwn�[��߯�^�Q�P���Lb�Ve��7-zu�4mJy<zN�zғˡJ�bj���Y��<���K�t4T�7�A�MK]I���>�:1i����ɣ��nb�����~��^y[d-��nzr5�iu�-U��}�M&"\��i���Օ�Ƚ�>&M��\��i����A�13]v�)s�~�ٌ�Z�����u�:h����M�5����=�����n���N髌��Pb��^S�|��*��U_V��r�K�������G���W>�
Zw��BVL�G��j��]X�$�����MFZ�u2���i�X�����&c��9^b�y�dlz����0�A/5�G�e���p��ص ��������^����"2�碅P���L�[����ғ�'�߮A�)>#F�K�����]o��o{Zo��v�����pi�3���'�6v=�mЇ;_BWm��!�Զ�Y��B����������Ʈ�܆k��ڝh��R<b�ߪ�����ML���t������6����,��Fzo9�6CdA�7ކ���N��7$F���N��o��!�YZ�D���������=�!����aA�X�y��2��A�^\�2w�0i<���~?�Hd�)JS���sdZe�L�����	�7;�.h\��Ec9��    Uw!���mR�d�]�e]��(�k����U����4�������^e�!+��]���^㙀 �I{u]b؄LC��H���lNPWK،LC���2�i8:o�9���x�H�q�ճ�?-�X�]Mz�X=�co��1o���e6A�u��BdZFa��8��c}�&�A��㙗�#��+൑��pvH�����1��UR,��:H0��9�G�;J��iD0İdmV�6�J?+��+D��=uC���`��3P�+f�yF�~R�,(Z�}�f:��)��d���ڣ��	�8��@ ��Ĝo��Y��kN]��.7��Fm�w[`�hT���.A�
;�ʵ�i��"��G��<4�nf埸r�v�ɧ.�������Y����?�h�#&�LVK��G)sr�����#5×;�!�j��5N�g�'su�:Ϫt�c�5yţ��g�*��kUՓ��@����i
��8J�w���UgbT7b�L���ǻn
r��s���xS	r�)0�^�
�)0�^���#��x��{V'�����U������o
�*%¤o!wޣ�4�4��p=��FvA��Ц`|͖so���5���g!xd1Uo��G�*h�웦/���cIi�-�ݦ��]�·B{|�)�)0��
��$�3��>��f���2�X�o�-&�:&����K�uu�ܬ�b�.f]|�iw�r�w��!��쩂2��M����$B)9��W�f;�������DB�}��Ր.Ã݆�\^J惃��˗�Y/�uY�j�1YX5=������ɽz̡�h����.h��y�v|��Qk�L��S�o�L����l���0�Ni�1�U�pl�lQ�V_���Ȉ�`;���>ؾ��a����8D�6�k�a����ll��<� ��P\��6�!��2/��mTyql��Gۨr���(W�1�c�U.�~lc�[7�Q��(M8�Quz�`U�����6��7�1Ɉ-�1��-�Q�{�`u�7
�1�ۘFlc:���`�6��(��|2b��m�#�1����|2bu�7��p�6��ۘGlc>���`�6�!�0ؖ��XGlc9���p�6���XGlc9���p�6֓�XFlc=���p�6փ�XGlc=���d�6���X��m�E[	}��K���j@�v/t�4*���mo}�!x?b��j8�܈7� 86,bk[C�p�6����NFlc��<<`���oyԹ�/��#��]�tĶ������~:b�OFl��m?���#��d�v`[ڬx�N�b-�f5T�6:��PS![g=q^#TX�a�C�pO	�!��g	p~8Oy��Xt����C�PB��=F�����CC�����8��`Ȗ~�|л�<W�_Ƽ_dk���mv�m~��V�*�G�Z>��C'�a5l*��xF����'4�� �~̀��-R�(x���a�NA�o�S�B� x'�P���̱� x'���;��p��k����(x����~�T2�}}|�;E�����5���w�x���t�冷���;E���;�8�)�c��F���S���g��s冷���;%��!�N:���wR7v�����x��M�X9���D1�1�N9P���I�a�N�Hf ��t�7
�)��10�N����q���(x�	�8x�� x�C����(x��A�~M|��]�j)��-�n�n_�Ȃ����&�Z����f�lod�y��w�פ���W��;��C��B�XuL'x�����w��z$F���J������o�~U�l�P��{S����]��wU	�Eo�����s�&=8��o�U�;��zĢ�A��������\8x79G�&�7�jH:��1��?!8+}G�n̘�ޯIp�U�7�"���j���[�~�୲�8x��o��o��k��a��{���8x뻽a��ʐ��=|^�3x�f�a���o������[����+�)���Jh��=��N�U�)�����xO�� �VIp�s�>﬒�0x� �C ���Dq�/�͡P���9��~�vF��	�<8�Y��w�� xg���w�r�3�Y�E��;GY���w�V	��;�yk�c%�c�W�r��.�zXx�{W{-�B�;���(x������Y������2�#x����;'yi �Yf�q��*�wVs�a��I� ��j:�9�c�UB��y6İ1�*��<C����1�'g���w���a���g`���1�;+gY��w9Q�lK<��ku�7��b<!65dG�L1Ԁ�!'e2`�.����d[��!�`��j�Ԑ�n+05dC���jrj����SC6
��Ԑ]���SC6�L�8���!0x�6p�85dc�L�Ű�!;*755�0x�Vp�U�Ɔ`�݁�!'���0x�$8ު���X��������d����X�������q���xٵ����F�[�����1������@�[_����F�{�v%��e�0x���8xO�̐��G���=}�!��{���g�V=�x�{�a��m�(x5�d�
����]�<60�.A%4P�.��0x� ����������.z:
�Eu�C�]T�eu�%�(�E�%�j����C�!ߏg��A��Xyp�K�]Kx��	^��w�_%~�D6����b@s�-�zȮ�7���Z#����-1����Q�q�M5�E��;g�������R�l��z��Z�aOUTk?�J�&� ��$�\�y�����S��z��d'��kU�J2��"��8�u�詊o�z��}E?=U�>��S��y�"�pOUt�?�Ԑ{�Se{�<UVE԰�*�� =��p{*��y*U߀{�"��S�&�S�!O��pO��1O���� �nwC�D��oӢ/w�<x���x�FO~?�Q� y�*ҰdF��(x���0x��~��5�&�@�nVwޢ��&;�@�~�j����X!�n�q0��[��������3xw���ު��fx��;�a���������#�]Q�����wW�*�U�?ު��!��U�?���)�U}ު�oU߀�����q���7َs'c�<T�����ѓ�O�J���/e�@OÂFC�e���^�
o=�o�ڏ���&� �=es���. ����~�k��hx�ת�k0��"�]�W����a��W����N��]U{?�5��(xW�Ꮒw��܀��F����FUD��w������F��@���.���o���Fyn`�]�R��5<��wUIp��j�����$8�5���k:Q��lk:1w���t��������~B�G��f�!�6xW���w���Q𮪵�0 x�,�0���.@�[�����e'ޯ�o��1�����U{?��W����k|o�ޏ�wQ3�a���0xyn��]d�
慠�a��� ����ު�o�����so�䏁w5x
o���[5�c୒�8x7Y��wS�!у���EUC^�I��Fl�-5�2d<p����*�w3�h�G�[Ϸ��[��c�ݭ�0xwY��w�J����(xwى��k�o}�;��7�3x��~���2�3x���ު��fx��;�a�����{� ��w��<6@�*�������[%�q��� �[5�c�m]���J����1�VIp�����{���[�~am`e��x����	U�������D�,�雵^Jڐ�Y[�䥤M�͢��Dk?�-�v%��k�羚vG��E�8����T{?�-�*C>�w�>����j���%5����Q�nI�0x�$Tx7u�;�-�c�TB�Z�!�n*	�wK������Np��u�;�M%�a�n�漣�0x�,�C �nY�`�����X��ʐ���ѓ��<8���Z��i:+?��tf�H    !�$��e:��^�-p�g,x��}����^����`�>w�`k<
b0���F�J��!��Q�Qd[h0^S����W����f�|6��7�W��`T���l0T�;f0��U���*�G�`4�����7M��h*q�����F��h0T�;f0���!������P���P�~�`tY��~��7��r@�7��C0ߏ��ܟP��a�э���}���o��:�w�S������;��._��Y�#ܣ-����WwA���]�|�Z�D2�L����ކp���&/_���p���B[��o�wr�!�ݽJ?7����fcA����nC�{���^5e��[R��p�*�Q����8XL�*�>�6ձ}�M?7�-��B	gS�����~�1���&��q8wb���:�{2N�Q9�U��Uw�&wk�T����$��{���o�:ޯr�.�ݽʱ.:Wg�!U�n�A魠��i��w��X��of��n�e��nCP���Ǹ�ݴrk|��s�=6���!�ݽ�'GxD"���̂��^�Ţ���A�%����~)�i�հC��B�t.�:C�y}��82����v:�ơ=b�QA`:�&Ǯ��Q������a�Q6z�ING���'`:��&��@`�6�Ć�l����wl{���pCP�ol{R��(���8
�]��a����pCLGA��g5[=��l���`���(;�fyl�`��G�9T��a�����m�?�Æ��,Z�G1��`Rl�I���>wl�qd��r0b���m�#�����z2b�u�;��`Ķד�^Fl�N{�`���3��I�0ض���Gl{;���pĶ�Vwl��mo#����v� w�^��ˣю��� �I���jƳa�Q����c�D���r6���1l6�N�]�F��ߟ��c��~��-���~6�.6��(;*���Q1e�1��Cܭ��a�r��ݣ���0yT����v7�U��B,:*P���5Y����(l@�]�۩!C*��V �SSN��] �)QԀکi �};�Z� º��S���l���~�NM_#�g;5}�A����Ԑp;5� �N5� �S#Ȉ#d���k�픾��S��o�N�˿a;%n�>a���ߨ��x� �&��)�&�ک�g�vj���N�x�!�M��Ј�'�bj�,d��5��SC/@��HrHh����N������=����S������b�^a��W��`^aobW���������.j�YT_a����fQ�
{C�p$~�+�1������3�n�x���g���=�
����+�A�.p���7İ+�w>��7�d ����4���F��82��^�|KqP�1/$	�B�2P�z��-��Ze=9[jN؂��۴�]ox��g���k������įLT�F��N\�c�/v�s7|���M�0��� 6����/0�kj�}���>U��C_�?���&_�����:6�b�.'_`�ױ�;�u�}B_�?�bg��M�0���oܟ|a�a�/vN�'_bj�&}���>5���a�#|C�4��n�#|C���d�i�*�>�����]�ɗY7e�+�n�Yu�H4S$��h�4Ί���)��Tm�8�N_;�g�U��8�:��v_ �#�� 'lB`;�*E�v�I�(�� �lgP�7��Ӊ��$��!_/
�3�lw�v�a�(��(�lg�.��rQl��)�`;�<l����팲� ۩���Έe�u.ۙ�#�6��tX�ơS7��`;��a�9N���v&`X��v��y��U�3��z��`����Q���$�G���p�v��ۙGlg>���p�v�Y�0����YFlg9���d�v���YFl��q�m9���`�v���YGlg=���p�vփ�YOFlg=���p�v֓�Y��m���k���	�&/��#�����v2b;���l#������&#�oQ����Wj�YK�?}��lw����Glg;���#��d�V7��`�OGl��m?���#��hĶ������Fl�Bёh�@M�_�i��vW"��k郾��#�����8�`ĖN���;_xX�� "���ш�8��	pl�ш�"��N0b�����fpl�ш����v���΃����"`Kb`�v<�%��[<�%��[<�%��[<�%��[�Џ�-���ؒ���-���่ؒ-��[��|B�[R"��CI���g#��O�El韂[Ţ�O���.v0bK��lĖ��و-�Ӄ[���"��O�Fl韞�ئ�Gۃ`K�#��v6bK��"�$v0bKj�"�$v6bK�g#�$x6bK�g#��g�����ؒ�و-	�����>�%�s[;�%��[R;�%�s��و-	�ؒڹ�-���ؒ�و-	��ؒ�و-	��ؒ���-���ئ��0ض�[R;�%��["��I��^�LK̚5� �]�q���&v50b۹F'�@n�����]��nj�dĶ���v0bۿB�M��R�ೱ��]���`�vl��6�۝8����d10b�*��`۟`Kf4���U��۾X����ؙ����T��9���+��e���Sc �]��N��$9�Q��,Dlw1,b[�U�=7:���M�5��GlY,=*��:ָ�����`k�[�$mtn��{�"�����<��*b�<`;���%���;�`�v4��{�v�J�r�N'"G�e���NFl���"��cP�������Q_쎂m@�vC"�����m�#�1�[My1��]��n����Q�alc#���r�(�F���m�@�vS[lcD"����,#�����P4&���6��ۍC���F�6&0b�Y4& b�����t0b���B`�$tl�N��`�qd�ۘFlc>���`�6��ۘOFl����|0b�Ɉm,#�����r8b��sl��m,�#�����r8bu�7��p�6փ�XGlc=���p�6փ�XGlc=���`�6��ol��ml#�����v0b�Ɉml�#�Q���m;�U7s�g�1.?m7sy��X0}�K̑�0s�,(#��3�)� S�3��6�g��y.Ay�c�z�OWq��'k�۽xd�`�m�E~�6|�F��rd�b*��G�ϋ3���{
�@f�|d�jj&��M��ؠ>�����L2ϑa�e�t��x.\��[)t>>oyu��s��#��ۨ��x�\2y�IA&h���e�~���#�S]����j�ΠG�����KM݋����o��ֶ�G�S0���oq��dy��#h;2L���^ڢW<������ua���.�XH0��c�XP�޷z���ԝ �j����G��	*�-�,��O���#��b?,V�*S�б]XL9pO��,ןN�	CMy����`����-�Ķ}��^7��^��؏-&�Ʒg��]m�o8\��jtZt�u9��e�C�D����)8��蹢j��X����R/�feQ��*S09��xZ.;��g�"^�[趷�4��i��>eMH�o�Y�n)Z����sS}$z���H����>�^��Lmy�Ե8�Lf�ːl�wV>����;�����Kz���Հ;+��i>�(��!�X����0�)�N��a���B�n)9��\;�\�v��M5u��e��%VG�u��Ā;+mA�����-�>�DGd�����ko�wV>n���M�����������2��*��܁�j�k����fǋLք����I�*Ӓ��i+(��q=�c��D��|&�5�2���s,f�L]g�]p�^f��U���(�Q��"��vTQ�nj� �˴��c�_��ʂ��ɴ��<+|L���RT}��a���R���0VC�]5�a�d��EC��T���=X���p�@;Y�O���Ű�t1l?Yk]'y�f��,����a��b�~���.���a��b�q�Vքk��b�q�v�.�G�a��b�q�v�.��G�a��bX=X����a��b�y�v�,��G�a    ��b�æp�6Y�t9!���k!�P`Êa��Ű).�M�d1l
��aS8X���b�U1�t�-}%������D��T��l+��"���6%@r��!X<�߇�W=zk����u��4'ퟜ�M+�5�RغR@��YC�$�X)l]�>#с���t��;\
���Rؔ�¦t�6�å�)�,�M�`)l�c5Q�M	+�}��1C(��<����bX)l]WKF�7Joe���RXC�d)lʇKaS>\
���R��Z�U;��s�3r��Z�M�����?���{3���Ax%�׊�8��㓴�KkY�V>��=J�������;�_����{�`�/����]�N��WK�E��|��K�I�b�'��5��_�ု.��_uု�m��/��< ���F0��v����m�_��'����M�U��M� �7���dr�r������	~S�|}�$�(z2�\��D�EO&�wi�1�iq�UZ|}�$��82��kj�0�wy��)�W38��k�|5��!�1�W8�����f����|�*�H��0ڐ ���_�\��?]�3��l��W=�O�_��_���_\F�����3|�3�?��𳺏�䡁~ʙ#����E ?��9�Y��A��*e~ҖC��E����j��V���#�6��ל�Y�Ϣ���gy3�1���J�sT��~~M����U"����#��d� �Ȥ�����(��$�:�Y�N�~N�A?'U}�~N.�𳚇�~VQ ��Y�xQ��j"
�9��,&�Y
� ?�l:�9�3��U�bN'
�Y0�yh��_�3� �a^�U�|5�|�2��H[�~�e� ���0�[Ys�qd��ל�a�͞|5����ٝ(�ٝ8�WG��G��V�;��a?>~���"���k"�&�:���J���3���+a�o.��[��}�&K�0�o*���2�_]b�~�ռ�l:�]� �wU��k|5��.�U�9���B��r�8�!�૔9�C�r�Uwy�<[���E�m�yF{2'è�r �!hd��O���m����[1����o����À/&�|5���σM�Y7�À?�7�ֲ�L��L"KÚlA���PÚlw����l1��vS+�d�m	��lK8�d[��B�K8�d[��&�6ٖp�ɶ��M�%n�-�`�m�X�-�T�C!�WoTM����j��� ��c��(<P���M����&�O6�c��m�/���7ٖt�ɶ��M�%l�-I6�b�_�C���5G �$���P�˚lK�K�lK�k�lK>�d[��"(��|��v#蒱&[Ch�5�7ٖ|�ɶ�M�%�l�-�p�m)g�lK9�d[��&�R�6ٖr�ɶ��M��n�-�p�m)�lK��lw$�����*�`����l��M��L��Uw�~$mOAЂ�,<Ft	� ��KR���u�b߿�`����ُ�g?J;��(�p����ُ�Nf?��{��v8�Q���}s����G�I����&�Q��dyf��v��Ln�I]t"=:��.x0�Q���G�'�E'�as�f?J?��2��]��5D����e�U^s��~��s����Ps4g?����8�����t�c��~��ُy4����as4Of?t��2j^;�e�I�1O��	����Sn7�-��Q�^��v5t5��.����0Yp��I�Q����Q�a�Q�I�QE﹇��Bd��r�u�N�YU��>�6�x����5-V��m���#�T�(�#Ɨ��%�d7̧+g�����{�f�����gC�	v>������aA�/�ea�M!�_����nj*K�.���\�� =� ��j�_�u+o��T'��`��j��-5�,��J�r��l�nod�.��YPZ����z�me�:���\b�b���������_4Y�Z�%�ի�����	�x�
٩�gd��]��b1�f�����9R�<7Z�l1L5e1��b<	r*�2.̎Y�~�|��-�X�������Z؎V�_�4̗(�T�[`���
��0J�Қ�+SPe���⟟rz������+��-�2Ő��s��0�(��Y`�/S�)&���F�}Aw'?��ȹ�wR�+S)�ZGF(|�/��+�\�<2�u�7���:kA��/�)�H��Q�ΆC�Ǳ�_���'�����A�שp��,��(^d�a��rJH�}���N
���,v��u>���]��)��**��e���iq��UZ��&��0�oH���]� ū8N�]x�(�#UTw�&r���ݫ
,�ַ���r�8���W�b�Ux�1��t=�6d��fI�~//��\U`
"WX�=�R��|׫#� ���`D�+i��ț��mA�ߒ��t�GN��#}X}�	�1\�lJ�q���T�w�wٲ`���ۜ\�;���^~f�.��-��ظL���ˢ "�*ٲZ�u���������A���ˢ�%� ��g\�#Tv�9�W+օlm��y��}�zã�?�M�~�b�S��'ƒKȴ	4���}:��T�ֲ`���S�9��YP����`ȏXb�?\�,(#S�*��bry�����N�4�W�����j��Xk�����ڧ`����R�,�zh��qkm1uhd���[�������6dQH/W��T�҃��X�Sl<ʨ�Pe.1+�wkmA�.\%&ϕ�S#k��5ޘ�k��]�����\.�}�ܒ\|<���,��駙�����Ѣq	kY-��+��_o¨�����Jd�>#�\�!q0�#c^�ZSM%�!�m:��bmS�ok[�BlAi�1�m��r/����Uu���YWwb�.&�
��jC|��6�򆱶���(ֶ�km��y��X�r��}�������V��`m��&�f���$�,����̷k�W���۠�['	���_��v5�b٧`^�*�9
׊t�.���ԡc���bm��Z�c��ǱV]H�am��&�Vy� ��������v�d� ����T��K���
�F'Վ'��\�s��Ɖq�jw�����Bc�l7�r�$[�N�9������U����]p^��Mlj֖�Б��KM�m�~�������vԖ�Et�R���ְX�!�j�+.��[(#z��5�X���j���ޫPKb��R!����MNN�̻�� ���yU���k^P۱XmY텑G��6e���-�G�E��J�A���U\���䑁#wW��r�!?>�E�7��jx��y��b�z�ܚ�D�;<��_EnCMz﷐�Fl<j=���Nz;��T9O��s_����B'������ �!&ׅ���r�#�KX/C��rb{O�}�� 6�U�ۋ�%s��1�8�|Yt����0O�]M�j1�F��ۂ�ucȭZ�q���a����a���(rOyT`���tt��Nw��݃+L��{ ��l��y���݃�c|D�.������pt����"w�xj������GYC!w�	�~25R
E������VF�evB�[�Q��Q��b��E�D� ���iE��'yl@��0Ģ��5�{�� r�$+A���'Ж��%���z4�d�	O�,�z�4�9����A�W����g١9��U�u=��O��t���Aϲr=K{:��Gi�;���
��&�O8y��GP\� �Aq9�ώ�5�;�bU�"�@%�qG�ڽqGPY���]e���{��d���AU7`�@??�D�u*�;��A��=��߈#PIo�4yl`���u�;��:�&���1���0��z��ݤ�Ƙ[�y���e� ��:�3ww�fn��3��v����Y2w�ô��[�x���]u ��[vy`��*7����e2>3��x��=�ks��7��C�8s��7��"�2������5��d�y��k��<Xk�'Vk�S��z�̭��1�X��!L11yޯ57İZ��G���s� k�1�+67�b�G���    s�s���H�g[���MdS�$�|?[P]Qr��I���	���&��CwøZ(M�r���g5�BY<�M��y�L�<!��`;#H�T�KP���Yoc���}?���ykW�7�=��
�U��lUmL�_�����6'w ����M��zB�'k��̟e����;{�J�1�.�:�����%�D����D�J���k+�H�|=a���a��b,��_9�Y�����O��Z�ž�L�=����r,���+��ơ�A����>��8_�� y:CsNDjs^i�%(ks.�������}?����<���8��<k�;�G��b��g�oS�*r�b<���2'_"�bȔS���\h��%�2x����Ԩ�-�)�LiY?�\A
5�JK�em�[=�eh1u�u�Aj�#Rsvv�����޳�鸠uQ[�)q/�L����3�CN�݆��ix23�v��O#
���22%�D:Ϟ?�>2})�1�S�����>C�ϥd�q���:y���g���x�
��<��<��q�бXc	c<_�L۶�#�L5��l	�y��Ʌx��A���4.��v�q��'S��Gw|Ύ(���f���M���Bk`Ai����������j/϶_�p�,��bIc�qS��8��T�:���kO.�3r�c�|@Y1�!�]��r/Y��-���O�xj�T�-<da�%!��,�"�������;у-�'xi
�W�]^.���VW�0�TF�����˺�[N��������_x4٬��ͤ��ߍ��@6�u��e��o(���ש�X��H#��#5y�ѥ?�KP��p�+|�����jE������}=�j:����1ԐL�V8�r]��d��'�i��W�P{=?�c\����VIB��	|��lH��)�1:>J��<��K;�������W��2�>e�E���W��,p����Xr��i�����!(Oo�~.���X9��7P�~�pbȨ���p����F_��uq�.[M9���%Hn��K&Ѻ�<�E�����'��>@?��Ud_ς����] ��ވv��J���2'ǕYua
"�.�B#�d^Kj�e���1d������d����4br�Ex��6쭻�j�v]V��j�������"��M#|G��	U��� a	F�\�6�:�xe�k\Lo�I�"���nbn9�����.����a.B�AK�F���zօ� ����GȻ��nB�C[�)���!����K�l1��~	���zX�g��UB���I<8x���Q�� dCP] �#�N/����Ǌ'���BΙ�0�������<	���w99�;x��X���ILFb�]x3�`�F#]�@�U=�s���p�'�7a����:1��a#N��A�]u��)���bﭭ��.q�5��d����^���	��L�.�e:ܻ݅�:1����Xjȓ�kGT-7�:�j2p��Mb\7UBm|Y#�A�.LA�.�pZ�L�i�g�,(F� �.���x��J_r-�,+jԅ�1�N�/���:���ZG�/����꧝qjCЪ�r0�XW�{�G;��sO��&�L<L��AK�|,�XV���"[CPM�t0-_Bb��B��C�V��:������7a�����i�3��gnc�%(��5��Y�bZC��o�]�X��*	�����٘�a�]P�ֶ�{sy���Q"A9��M��`t=��F�`r	j�5�}�li ��-�X� ��dib/>�5UE��m~6��2	�"��E[����SY0ZdX�C���ʃ;+O�3�K\B�������lw���v;�MH��/���}.A��=dk��s��>��^�[n��%X,(ύ��4Ԥw�m�c��6��櫊Jy�vTig0�V.MpR=��HP����!&�Ey{����1��C���غ�vk�-8�6g.c<cv��X��:���%����Og\R}C��	���������g�+�I�5�Q=��j2X����H�T�ۍݻ��2	a��v�cww��|�nU����g�6��F)KP�.��{�ḂݻZ�0��]�0vw�ucw�[�êe�kW�#/�ؽ�oD��Ɔݛ��y�3:p�W�X�����!���%����s`���=�11��V�o7v���񍃍�����߂�4,A�rq��t�~2ul8=����b�����r��/1İ����9{���7n	�-�%���	�S�l	T��m	V�V�\�]�����pY�]L�
�LY�Yq�C|LO�W��̭�F�'���R�.h�,9�{����b�#NT�ou�j�xC��*�B�;٘Qwj�J�1��O��������d� D�1ʳ�����;F��Q(u�(��0u�X]O���c������g@��,���;Fk�=@�Q�a�*�SwL��B��˸����c���QwT��0u�$�,@��E0uG��ƨ;fًQw���(uG����;fyn@�U����Y0�^m7L�� ����B�[�a�Vs�0����yc�m�~#ԭZ�A��Yo����
��[�p���2)����PuWuX��]e�����L��g4>Sw����e�� uWk�=Bݪ��np��ζ*��Q��~cԭ:�a�V�u7���v��ۧ[�̣�G_��`!��K���������/;7��aѢx}��	Pv�!|��wA�E����sCL��Þ�e��뒀=����=����]��	:Pv�!� ��wA���٫H�?�O�� ��wA��|W��7�@��.����j'���8\vXv����wA��|��w�,^1�	��(��o�L��|��y�d�&o���<�<`0~=YR�o�� O�$y��	R8d2~�w
r��	R8`0���cѠ��rߘ'HA"� �B=AR=߰'HQ��'H*�{�en�I�{�� EuX�� E+"x���ޘ'H�� ���yÞ ��7�N	@h:�=AJ� ��S�g�	R�g�	R��px�-��M�4XͰ�O`�*�?z���B�$��F=A�>����,�!O�26��D�Y4<A��܀=AʇL�o��@o��t����c�*��y���1`OP����]d��	����d*����1�G�|=����+��	�.@�lAQ&������X����1�s�M�}�Q�UT,�aNc�z0��*6=���7a�z��2��4�!v2��t��,��e�e�'��Lc�v8����4Fj��I_^�Y�v8����4Fj'��I�Z���1��i���1R?��H�p#��i���1���Y�~8����4F����Lc��7jY��4�8�����dc�Lc�#���Vj�7��7a��g���1v�aM:�,�<܍���n��Z�q�2�wcb'�1�<܍���n�4Ovc� #R�aYJ�
Dݡ�ME)�X��x�b��� vc�H7Ʈv�#���9����A�n̲d��F-K���1r<܍���n��l��hYr���aYh�O��JdFS�]*b����n�wc�x�#ǃ�9����l7FN�1r:܍���n��vc�t�#�#��d��{�Y�|C�%� ��<�N|#�%�~oزduٷײЖ�\F/��̬�����,���)ز�,G�A�%��7jY���F-K�ր���"����5����` ����1��P˿i�����������-g��J%h�cI�bU�k�?I[�{��g�G�7�+fފQ_��"�ھ�[��=/�=O򰏬����}<�e�f����o��}�x�+B�����UΜ�7C���P��S�y�7���M@w�7��+�:�\�i�Y��{͛!�7e�%�]�ڼ�ҟc�M^�}���̸����W�>x�k�͔��͛"Av4�p�>AF�vޔ!��CF�UL���B�<6jw$C�����Gޒ'����hA����� ���G-�ΌC��� ���'-H?mA�Iҕykl�-�gK[a� ��w�J[	���NC�?����O8T���[��
�Η�򝐍��C2U�8$C�eavH���i�C�C҃`i�A�!#��;�1�o�C�{�:���t�!��kb�����}����    ��.�����.�0��5A�b�M�҂R	������ER	����)AV�C���9�J���J��vH�5}�:����C*�evH%�D�!��`��g���fhJ���0��56SSԨt�!�3�R����0����C*"a�:���B+�!���~?�*�BRI��0�T^s�#<"��C)��u���K���
�Q91���g˺2b�d���]Y���L[���e$��U=�����'�*��-�Ry�R��{���������\y�L��h���R�4.'���v�����5������m��I����/٨��8�]P%>�������E$���]n#�N�Z�C����l̮'/�q٘��>�7�3�ț��w^�m�A���lc}�cL��-��p���_��^0��=�\d%��ؘ]L]��1�+�G���4�z����S	g����1�,��[�KP^��1�X���_i>
������(��v5U���	���3�J�3���]P�B��	�����C���9s�O���p��5�+��ioY�ʁ#.�����G�����!� a̔����u���c�3�Ҡ%ς��2��j/�S�n���Ӻ�#�[�~�洽�;�
CV���LU���MW�����Q��}�a�������n�a��U�����k_���Q���uY{�BhCM��R]�WΏ�F.stF"�Dw"�!�X>��Ϙ��K�F���Uw����y@�}h����m�)���qU��>�b�e� v��\: 3mm���KW���
�Ys]�X�	���G:�FY|�arCL՘T��g2`�q��oĂ���8��PS�W��H�78r�%��mMX��䆘*�r29mVL�$H�-2	��y&7�"�iv>'�Ө1q0�!�������<	�
y8����6Ɗ.a4��j�� ��c�15�*;��f>�ɔ���5U}�-��v1�U&'�8苠wG����������˺h���m&+NK�%��#W�6/����7��ʵr��w]�+|;��z���G �VYL%΁^��<J\�a�e�}�έ�Ū�M^v����c�&w5�d�A���p� 󢱠̡{����6�(kK��|��'��@�9FVS�B�c�U(��:�7��Č��:���(�c�������\ds���1�rm�o���x8K�It�c���%��_t�X�N��U��݀���S�yU�|��]La�3�N;U������?�}^�
�۲V�������5��&�b4�W����g�<��J䒐��Q��w5���_1�c
%��&�6[��j���ۓ�;;������]L�7�W����L~����6�-HK��s(˻:��1�OWp��'S���>�2�'�%�W}����C�c�a㭌�Úύ'���/{��i��m��&	�����F��˲�¡��Cܥ��{"�짥+W���!SYֽ�aH).�j+����T���p���I�C�aS��Ǯ��.���Zv��5�r7�a���s��1�d�#_�0$V�O�/�/�*��0��ǯ5��צ�{�o�1����j97��|}BW�����8�>���*|�^Y�ge�/y����S��O5Ux�� Rx����tr��9PRx���h/�]3�m�]��gJ�-A�]{�T�O�q��'�ǆϡ�`�B.���񖾾=�q~٠Zbj;nP�1��AU�r�A]'G�d���u��.i����T���u���J$?�豮7a�jPMAU��2�k[!OYQy,��.�������'�?�=f)�^޲�j�uh���1�۶uZ��.����i1�~SP���Z��r�#�1����2�^��I�%��']�j4�\�n4�]��F��s��(����T�h�-��7��jH��eeT�9�T�9�T�9沠>sS�Ui��eM���b��t{��\�i<a.���e��>�+��e����]VF��]��2��D�P.�d��cZ@�P^��X��j�n�z���c�t�9�ZDҀKpM��'��~��4�)��_ԢJB.�Żi@�5�G]V�W��.���i@SIƨ%Y������]VKe���j:=����n'�\V{M�tYMe�Ϲ����!��T�9첚�����i��uY-��O��e5uM9�Z��@.�eYŎ���e�GJ���Rm#�w�)m*c�6���]���6��z�?ڬ��)�mVS}��*.���f� �|>� �|>��|��-P�+*H�)��@Y6K���6�"-P���w[�̧˸����Ns�fUY@��,�&�m��4GmVEFO?O2Ft��$^��՚z�fmj*E�Y��+�����CM�d��80�+6-g�䡁�,�/�i��*�K�����[ir0��f�b��Y�A4��l����Y��6��%r�f��mO�+RS�q���=Y>F%�q��o�=�jHۓ�e�l{�lV���d�Y��,kD;d���dA�8Q����`>��"��'tَ�6k��A|}>W�g����Q�5��l�DfN��F�.d�&2s�22�P�o33�N3��@����s�YSV�`6K��a�Ճ1���ꪙ�Y]u�c6��9d�z@&N����i��pw�)�&N�6�9q�Y=ȉӘ���H�ج�BlV����)�e��-����
�KW.bޛ6kW��+��j������	���u{l�.��}��c�ʚ�6�G���6�'5$�5������$����$��]6k��>����J]�fu�3�mVO�\�f����/��Az�\��i�\Ǯ���]O���%��<��4��.s�~���H<.�9]��S���*O��5��5z�9�����tG��=Nw�|0��u���|2����tG/��]���������%F��c�ʑ'��b���Lw�r2����tG�m�^_<���P�IwljU�;q�J���
�;6lֳ�a���Nw�z2�ѫJw�^�t�.��;6�v2����tGoX�c�҆Ly3�"�]+���d�.����f
"S�,oȔ7�;�ݱ�����`wG;z?���u��p�"9��6��r����u�Ç���$9������Nvw�q�����c#�tw�j�����Dr� �;6l6�#>vw�y���ϓ�]e�q�@w�.�tw�j'�;�<������ �� #�0���|��z�w=��8���v�I��0�߇���Aڳ��ϱPS�J9�u=�2� �3-�˹�e�@|�ɡr��mYVY�8�ʖ�,+k$�j`��}�e5�YVꜭI����@���f��؇��Ǳ79T�|��x�pk �*�Iw��3>�w����z�w������j}Y���Hq����o?������`��	9��9/�[��:L�5�""L0	aǘ`�D�Փ7��cL�m��W��	��{c�Iy9���l�p�0�$�c�mS[$Ϙ��(�$8w���)�xƄ=.#2L�������v������׳\_��'�n9m�������@�ᄬ��_1��;X/������z+�_�^��n�p�z���ɀ�sB���z������u벿�8ᨠ������"���B1S��
8��x���������q���1'���߯?����z��S��g9!N;��NV�/W�Θ��8A���H�$��s��2t�m>a�n��w<s��⎬�;',�Ȃ��#q��3���83���.����	qT^�	7'Ȅ�s�L�!'H]9�9K�9A&�<�2N��r�	����Yr�	^A\�/�Ԭ^�/E��}���C��/��#�iuG'���8�Pݡ�ޗ�i�	���5���$�HuGV�/W����,F�;�Z���'8�-�l��iX_�s�y�dw�@�uw�mv�)ǜ�mj���	�XXO�[���	�°�,�z�|�a=j�=��CNp	bǜ��S�8�㬜s�������,'\ϖ�r�+�>;?[dD���0P���N�Į��]����_u'8a ��	��5+�	���b�ݡ�
����|�8n�8�ᄁ�O蠜�[u�]�6� �   A�����
wד��N�z��߉���o���^��{q\��T�?q=b�9a'q=I���x/���^��=�9���cN�q=N�ʳ`m\���?sB/���8��ul�9�(���0��ד�����ד���z�����^F����z��?_u'��y=~���)y=����zb���8ᬠ�����"�x_��� r�	�������Z�Y      j     x���_k�0G������B�+��^L'�!��m:�O�n�7���zK�����I�]����<oۼ�����[:o�z�>�_��\{�AF�>�i�So����?�	�1������唶�Z�(r�Gr�đ�����i:������R�F�l�R�d�@��g{��nz�O����A�+�� ٕec�ʲ-�wL/Ӻ?��N� `ƒ�3��5���d�A�cz�M hGۂjD�)�F$[�f�=zǖ��l	ZI�ao3��A$�ۣI����������	��x���� p��\9�fl ��X2���%[����}���ecP�v�-�u;�4��ނf��[P��{��s�@�|��UN����s�U9y�vF�&�����_8��u��̹����"?4���UͿ�4��ϧ7"G+�Ry>=(U�OZ��ӃV����Vy>=(��4t�e/�9�Z$�2�dK['�N��ҋ$[�䧬AO������嫉�SC�z �n��/I-����d�.����r�~�����      l   �   x�M�]� ����}աl.���iPt"���l��닍��������[{s���.���#��3���A�3Z@�{��5�gtG�!�%ԏ��1ת""���>tƅ��B��ɤ�_�����=�H���@ݍ�TM��gӿ�����N��$*I&      o      x������ � �      m   �   x�uϿN�0����y�Xw�����v���D��3��{�
Z���W�}dt`��&A��)MY�9�D#N�¹0��n'�G�su�P54G�$�u�#��*L^#�v��V������qb"�X	�������}��������?�k[�>Wg�z�,aһq.*�G��~'x����<��qZk������(|Xn&�^&x�˭y�ι�U\�      q   �  x���Mj�0�ףS�13#���t�^�c+M�i��r��J[�@[;� 3���<�`}�n�M�jgАk,��K롇0�^-�*������ެ<?�O1,��>h}�?v��#a.$��
 ��[������t�4�R<߬�@UA��ٰ��\6d>f�)�oX	��k(�/��>���K��uE_�S�?v��!��"}��DҶ&LǠ��X���$�J�z�U�O����1������?�h�3�Y���4q6���ח�O�f��u�2p��v�0�	,�����8&����ܯ?��a�V��r�+�fh���b���2<�q����C����SL\P���}����`�d�b����M?��\*�> �O�d      s      x������ � �      u      x������ � �      x   ]   x����0�f�*@'�t�9j�N��� X�x�a�F��N	�SA�z\P����PP�LC�m�����~�����.<Zp��� (x      z   T  x���KS�J �u�,��b�g&��1���$@ �_f */�U�^-(JiM}���`���l/
b�VI:�_�H!$�F�^��Q�����<O_�c�/�^r�6�/p��V`:��7��{:��j߮V���4~�44�X���О��iCCL�	,@�BԂ����W�������Hx��/���]��~2��;��Ȳd��_��1sA���n�ښ��=4\�R��]���{�d���q�{���aB1a��!����"��-�,� ��C.Cf��� "�˹4�D�f�g[�+�I�K��>�h�Ko7���~t�/�[���=�qH��f�Cm�e����a��E��D�����\0U2�-f y�]4���,J,$C��h��Kw���z�P�5��x%���y-�Ӂn�"He�-�z��e�J��g�ϧ<�s� ��:1THֹ\��ޡi�d,�����{�0��Zb ��2������kK��I&M&���a=RV�݈�̳�����XXn0H}!�#Z-�E6q��(k���D��� ��4���.�'��X�d�P�/"���7M�� �S�ݐ22��`s���$�" ���BJ�筧��8xY ���c�ʀa�=�qHA�f��nmz�)��	~��76&�2�~�ލ(���qRz
�������J$�ƪ�u�g?Y��s?����r-Y�Ն�6���9�.�gPyZ�S��ѡ� ��fN��fS���8Y��0LV Hv��+{ݜ<.on�^�Zs�c���e��S��9�D��g�6.��;����d������<�I(�9t�`E�8y�y�\�ڥd�_ti�#{\�WvV�?�I��k��t}�������K�&Ґg�K C��wR>���`�&�d�����4��a��=���q�ҿ��ԩ:#�N+�Iӵo-��F5��(�A�����@v<����'��p2�^'��̞�\�y%�T����>r;��ŴFl���x0��/,���9V�TZX�<t#(�Ӣ0�}��`�B�qCb@ܟ���?�n�����Д����aQ�v�M�D����/���(R,�E�,2�r_x�igO����o�y�     