'use client'
import TestItem from "@/components/pages/tests/TestItem";
import { TestSetItem } from "@/components/pages/tests/TestSet";
import pool from "@/lib/pg";
import { Col, Row } from "antd";
import React from "react";
import type { Metadata } from 'next'
import { SignInPage } from ".";
 


export default async function GoogleSignIn() {
  return (
    <>
      <SignInPage />
    </>
  );
}
